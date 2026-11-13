/**
 * Next.js 14 ISR / fetch cache backed by the same Redis as the API.
 * Admin writes INCR next:tagver:*; get() misses when versions moved.
 */
const Redis = require("ioredis");

const CATALOG_TTL_SECONDS = 60;
const ISR_KEY_PREFIX = "next:isr:";
const TAG_INDEX_PREFIX = "next:tagidx:";
const CACHE_TAGS_HEADER = "x-next-cache-tags";

const nextTagVersionKey = (tag) => `next:tagver:${tag}`;
const isrKey = (key) => `${ISR_KEY_PREFIX}${key}`;
const tagIndexKey = (tag) => `${TAG_INDEX_PREFIX}${tag}`;

/** True when any stored tag version differs from the current Redis versions. */
function isTagVersionStale(stored, current) {
  const storedMap = stored ?? {};
  const currentMap = current ?? {};
  for (const tag of Object.keys(storedMap)) {
    if (String(storedMap[tag] ?? "0") !== String(currentMap[tag] ?? "0")) {
      return true;
    }
  }
  return false;
}

let redis = null;
let connecting = null;
let warnedMissingUrl = false;

function getRedis() {
  const url = process.env.REDIS_URL;
  if (!url) {
    if (!warnedMissingUrl) {
      console.warn("[cache-handler] REDIS_URL unset — ISR falls through");
      warnedMissingUrl = true;
    }
    return null;
  }

  if (!redis) {
    redis = new Redis(url, {
      maxRetriesPerRequest: 1,
      lazyConnect: true,
      enableOfflineQueue: false,
    });
    redis.on("error", (err) => {
      console.error("[cache-handler] redis_error", err);
    });
  }

  return redis;
}

async function withRedis(fn) {
  const client = getRedis();
  if (!client) return null;

  try {
    if (client.status !== "ready") {
      if (!connecting) {
        connecting = client
          .connect()
          .catch((err) => {
            console.error("[cache-handler] redis_connect_failed", err);
          })
          .finally(() => {
            connecting = null;
          });
      }
      await connecting;
    }
    if (client.status !== "ready") return null;
    return await fn(client);
  } catch (err) {
    console.error("[cache-handler] redis_operation_failed", err);
    return null;
  }
}

function tagsFrom(data, ctx) {
  const tags = new Set();
  if (Array.isArray(ctx?.tags)) {
    for (const tag of ctx.tags) {
      if (tag) tags.add(tag);
    }
  }
  if (data?.kind === "FETCH" && Array.isArray(data.tags)) {
    for (const tag of data.tags) {
      if (tag) tags.add(tag);
    }
  }
  const header = data?.headers?.[CACHE_TAGS_HEADER];
  if (typeof header === "string" && header.length > 0) {
    for (const tag of header.split(",")) {
      if (tag) tags.add(tag);
    }
  }
  return [...tags];
}

async function readTagVersions(client, tags) {
  if (tags.length === 0) return {};
  const values = await client.mget(...tags.map(nextTagVersionKey));
  const versions = {};
  tags.forEach((tag, i) => {
    versions[tag] = values[i] ?? "0";
  });
  return versions;
}

function reviveEntry(entry) {
  if (!entry) return null;
  if (
    entry.value?.kind === "ROUTE" &&
    entry.value.body &&
    !(entry.value.body instanceof Buffer)
  ) {
    if (entry.value.body.type === "Buffer" && Array.isArray(entry.value.body.data)) {
      entry.value.body = Buffer.from(entry.value.body.data);
    } else if (typeof entry.value.body === "string") {
      entry.value.body = Buffer.from(entry.value.body, "base64");
    }
  }
  return entry;
}

async function removeFromIndexes(client, key, tags) {
  if (tags.length === 0) return;
  const pipeline = client.pipeline();
  for (const tag of tags) {
    pipeline.srem(tagIndexKey(tag), key);
  }
  await pipeline.exec();
}

class CacheHandler {
  constructor(_ctx) {}

  async get(key, ctx = {}) {
    return withRedis(async (client) => {
      const raw = await client.get(isrKey(key));
      if (!raw) return null;

      let entry;
      try {
        entry = JSON.parse(raw);
      } catch {
        await client.del(isrKey(key));
        return null;
      }

      const tags = entry.tags?.length
        ? entry.tags
        : tagsFrom(entry.value, ctx);
      const currentVersions = await readTagVersions(client, tags);

      if (isTagVersionStale(entry.tagVersions, currentVersions)) {
        await client.del(isrKey(key));
        await removeFromIndexes(client, key, tags);
        return null;
      }

      return reviveEntry({
        lastModified: entry.lastModified,
        value: entry.value,
      });
    });
  }

  async set(key, data, ctx = {}) {
    if (data == null) return;

    await withRedis(async (client) => {
      const tags = tagsFrom(data, ctx);
      const tagVersions = await readTagVersions(client, tags);
      const revalidateSeconds =
        typeof ctx.revalidate === "number"
          ? ctx.revalidate
          : typeof data.revalidate === "number"
            ? data.revalidate
            : CATALOG_TTL_SECONDS;
      const ttl = Math.max(1, revalidateSeconds);

      const value =
        data.kind === "FETCH"
          ? { ...data, tags: tags.length ? tags : data.tags }
          : data;

      // ROUTE body Buffer → base64 so JSON round-trips cleanly
      let storeValue = value;
      if (value?.kind === "ROUTE" && Buffer.isBuffer(value.body)) {
        storeValue = {
          ...value,
          body: value.body.toString("base64"),
        };
      }

      const entry = {
        lastModified: Date.now(),
        value: storeValue,
        tags,
        tagVersions,
      };

      const pipeline = client.pipeline();
      pipeline.set(isrKey(key), JSON.stringify(entry), "EX", ttl);
      for (const tag of tags) {
        pipeline.sadd(tagIndexKey(tag), key);
        pipeline.expire(tagIndexKey(tag), Math.max(ttl * 2, CATALOG_TTL_SECONDS * 2));
      }
      await pipeline.exec();
      return true;
    });
  }

  async revalidateTag(tag) {
    if (!tag) return;

    await withRedis(async (client) => {
      await client.incr(nextTagVersionKey(tag));

      const keys = await client.smembers(tagIndexKey(tag));
      if (keys.length > 0) {
        const pipeline = client.pipeline();
        for (const key of keys) {
          pipeline.del(isrKey(key));
        }
        pipeline.del(tagIndexKey(tag));
        await pipeline.exec();
      } else {
        await client.del(tagIndexKey(tag));
      }
      return true;
    });
  }

  resetRequestCache() {}
}

module.exports = CacheHandler;
module.exports.isTagVersionStale = isTagVersionStale;
module.exports.nextTagVersionKey = nextTagVersionKey;

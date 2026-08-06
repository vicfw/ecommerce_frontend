import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { catalogTags } from "@/lib/catalogCache";

type RevalidateBody = {
  tags?: string[];
  paths?: string[];
  slug?: string;
};

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : null;

  if (!secret || token !== secret) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body: RevalidateBody = {};
  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    body = {};
  }

  const tags = new Set<string>(body.tags ?? []);
  const paths = new Set<string>(body.paths ?? []);

  if (body.slug) {
    tags.add(catalogTags.product(body.slug));
    tags.add(catalogTags.products);
    paths.add(`/products/${body.slug}`);
  }

  if (tags.size === 0 && paths.size === 0) {
    tags.add(catalogTags.products);
    paths.add("/");
    paths.add("/products");
  }

  const tagList = Array.from(tags);
  const pathList = Array.from(paths);

  for (const tag of tagList) {
    revalidateTag(tag);
  }

  for (const path of pathList) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    tags: tagList,
    paths: pathList,
    now: Date.now(),
  });
}

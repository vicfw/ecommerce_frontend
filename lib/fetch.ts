import { CATALOG_TTL_SECONDS } from "@/lib/catalogCache";

type FetchDataOptions = {
  tags: string[];
  revalidate?: number;
};

export async function fetchData<T>(
  endpoint: string,
  options: FetchDataOptions
): Promise<{
  data: T;
  message: string;
  total?: number;
  page?: number;
  hasMore?: boolean;
}> {
  const url = `${process.env.NEXT_PUBLIC_SERVER_API_URL}${endpoint}`;
  const revalidate = options.revalidate ?? CATALOG_TTL_SECONDS;

  try {
    const response = await fetch(url, {
      next: {
        revalidate,
        tags: options.tags,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from "${endpoint}"`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}

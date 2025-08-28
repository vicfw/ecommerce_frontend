export async function fetchData<T>(
  endpoint: string
): Promise<{ data: T; message: string; total?: number; page?: number }> {
  const url = `${process.env.NEXT_PUBLIC_SERVER_API_URL}${endpoint}`;

  console.log(url, "url");

  try {
    const response = await fetch(url, {
      next: { revalidate: 10 },
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

export async function fetchData<T>(
  endpoint: string
): Promise<{ data: T; message: string; total?: number; page?: number }> {
  const url = `${process.env.NEXT_PUBLIC_SERVER_API_URL}${endpoint}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from "${endpoint}"`);
    }

    const { data, message, ...result } = await response.json();

    return { data, message, total: result?.total, page: result?.page };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}

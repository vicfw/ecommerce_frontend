export class ProductService {
  private endpoint = "/product";

  async getProducts() {
    console.log(`${process.env.NEXT_PUBLIC_SERVER_API_URL}${this.endpoint}`);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}${this.endpoint}`,
      { cache: "no-cache" }
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }
}

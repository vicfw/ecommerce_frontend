import { catalogTags } from "@/lib/catalogCache";
import { fetchData } from "@/lib/fetch";
import { Homepage } from "./types/homepageService.types";

export class HomepageService {
  private endpoint = "/homepage";

  async getHomepage() {
    return fetchData<Homepage>(this.endpoint, {
      tags: [catalogTags.homepage],
    });
  }
}

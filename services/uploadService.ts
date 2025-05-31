import axiosInstance from "./axios";
import { Response } from "./types/config";
import { UploadFileResponse } from "./types/uploadService.types";

export class UploadService {
  private endpoint = "/upload";

  async uploadFile(files: File[]): Promise<Response<UploadFileResponse>> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    return axiosInstance().post(this.endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

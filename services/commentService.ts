import { Comment } from "@/types/globalTypes";
import axiosInstance from "./axios";
import { PaginatedResponse, Response } from "./types/config";
import {
  CreateCommentBody,
  GetCommentsParams,
} from "./types/commentService.types";

export class CommentService {
  private baseUrl = "/comment";

  async getComments({
    productId,
    page,
    limit,
  }: GetCommentsParams): Promise<PaginatedResponse<Comment>> {
    return axiosInstance().get(this.baseUrl, {
      params: {
        productId,
        page,
        limit,
      },
    });
  }

  async createComment(data: CreateCommentBody): Promise<Response<Comment>> {
    return axiosInstance().post(this.baseUrl, data);
  }
}

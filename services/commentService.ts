import { Comment } from "@/types/globalTypes";
import axiosInstance from "./axios";
import { Response } from "./types/config";
import { CreateCommentBody } from "./types/commentService.types";

export class CommentService {
  baseUrl = "/comment";

  async createComment(data: CreateCommentBody): Promise<Response<Comment>> {
    return axiosInstance().post(this.baseUrl, data);
  }
}

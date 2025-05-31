export type CreateCommentBody = {
  body: string;
  productId: number;
  userId: number;
  image: string;
};
export type GetCommentsParams = {
  productId: number;
  page: number;
  limit: number;
};

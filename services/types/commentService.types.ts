export type CreateCommentBody = {
  body: string;
  productId: number;
  image: string;
  rating: number;
};
export type GetCommentsParams = {
  productId: number;
  page: number;
  limit: number;
};

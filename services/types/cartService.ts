import { CartType } from "@/types/globalTypes";

export type CreateCartBody = {
  quantity: number;
  productId: number;
};

export type CreateCartResponse = CartType;

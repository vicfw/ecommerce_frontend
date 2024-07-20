import { AnonCartType, CartType } from "@/types/globalTypes";

export type CreateCartBody = {
  increment: boolean;
  productId: number;
};

export type CreateCartResponse = CartType;

export type CreateAnonCartBody = {
  increment: boolean;
  productId: number;
};

export type CreateAnonCartResponse = AnonCartType;

export type GetCartResponse = CartType;

export type GetAnonCartResponse = AnonCartType;

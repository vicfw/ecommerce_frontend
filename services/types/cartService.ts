import { AnonCartType, CartType } from "@/types/globalTypes";

export type CreateCartBody = {
  quantity: number;
  productId: number;
};

export type CreateCartResponse = CartType;

export type CreateAnonCartBody = {
  quantity: number;
  productId: number;
};

export type CreateAnonCartResponse = AnonCartType;

export type GetAnonCartResponse = AnonCartType;

export type User = {
  id: number;
  phoneNumber: string;
  name: string;
  lastName: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  discount: number;
  weight: number;
  description: string;
  quantity: number;
  images: string[];
  point: number;
  createdAt: string;
  updatedAt: string;
  badges: Badge[];
  prName: string;
  enName: string;
  slug: string;
};

export type Badge = {
  id: number;
  title: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
};

export type CartType = {
  id: number;
  userId: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  profitFromDiscount: number;
  discountPrice: number;
  cartItems: CartItemType[];
};

export type AnonCartType = {
  [P in keyof CartType as Exclude<P, "userId">]: P extends "id"
    ? string
    : CartType[P];
};

export type CartItemType = {
  id: number;
  quantity: number;
  productId: number;
  cartId: number;
  product: Product;
  itemPrice: number;
};

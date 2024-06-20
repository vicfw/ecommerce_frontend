export type User = {
  id: number;
  phoneNumber: string;
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
  cartItems: CartItemType[];
};

export type CartItemType = {
  id: number;
  quantity: number;
  productId: number;
  cartId: number;
  product: Product;
};

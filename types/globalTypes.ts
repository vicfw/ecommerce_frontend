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
  colorImages?: ColorImage[];
  defaultColorImage: string;
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
  deliveryCost: DeliveryCost;
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
  colorImage: ColorImage | null;
};

export type Address = {
  id: number;
  address: string;
  street: string;
  city: string;
  province: string;
  plate: string;
  floor: string;
  zipCode: string;
  isDefault: boolean;
  receiverName: string;
  receiverLastName: string;
  receiverPhoneNumber: string;
  userId: number;
};

export type Order = {
  id: number;
  totalAmount: number;
  status: string;
  profitFromDiscount: number;
  createdAt: string;
  updatedAt: string;
  deliveryAmount: number;
  orderItem: OrderItem[];
};

export type OrderItem = {
  product: Product;
};

export enum OrderStatus {
  PROCESSING = "PROCESSING",
  DELIVERED = "DELIVERED",
  RETURNED = "RETURNED",
  CANCELLED = "CANCELLED",
}

export type DeliveryCost = {
  id: number;
  cost: number;
};

export type Category = {
  id: number;
  name: string;
  image: string;
  product: Product[];
};

export type Brand = {
  id: number;
  name: string;
  image: string;
};

export type ColorImage = {
  id: number;
  images: string[];
  colorImage: string;
  name: string;
};

export type Comment = {
  id: number;
  body: string;
  image: string;
  user: User;
  createdAt: string;
  updatedAt: string;
};

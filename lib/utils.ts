import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type cookieNames = "jwt" | "uuid" | "userInfo";

export function calculateDiscountedPrice(
  originalPrice: number,
  discount: number
): number {
  // Validate input
  if (originalPrice <= 0 || discount < 0 || discount > 100) {
    throw new Error(
      "Invalid price or discount value. Discount must be between 1 and 100 (percentage)."
    );
  }

  const discountRate = discount / 100; // Convert discount percentage to decimal (0 - 1)
  const discountAmount = originalPrice * discountRate;
  const discountedPrice = originalPrice - discountAmount;

  return discountedPrice;
}

const expireDateForCookies = () => {
  // Set expiration date to 5 years from now
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 5);
  return expirationDate;
};

export const setClientSideCookie = (
  name: cookieNames,
  value: string | number
): void => {
  // Set expiration date to 5 years from now
  const expirationDate = expireDateForCookies();

  const cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieString;
};

export const removeClientSideCookie = (name: string): void => {
  const expirationDate = new Date(0); // Set to epoch time (Thu, 01 Jan 1970 00:00:00 GMT)
  const cookieString = `${encodeURIComponent(
    name
  )}=; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieString;
};

export function getClientSideCookie(
  cookieName: cookieNames
): string | undefined {
  if (typeof window === "undefined") return;
  const matches = document.cookie.match(new RegExp(`${cookieName}=([^;]+)`));
  return matches?.pop();
}

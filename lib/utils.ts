import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export type PaymentRequestResponse = {
  message: string;
  result: number;
  trackId: number;
};

export type PaymentVerifyResponse = {
  paidAt: string;
  amount: number;
  result: number;
  status: number;
  refNumber: number;
  description: string;
  cardNumber: string;
  orderId: string;
  message: string;
};

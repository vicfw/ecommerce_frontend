import axiosInstance from "./axios";
import { Response } from "./types/config";
import {
  PaymentRequestResponse,
  PaymentVerifyResponse,
} from "./types/paymentService.types";

export class PaymentService {
  baseUrl = "/payment";

  async paymentRequest(
    amount: number,
    orderId: number
  ): Promise<Response<PaymentRequestResponse>> {
    return axiosInstance().post(this.baseUrl, { amount, orderId });
  }

  async paymentVerify(
    trackId: string
  ): Promise<Response<PaymentVerifyResponse>> {
    return axiosInstance().post(`${this.baseUrl}/verify`, {
      trackId,
    });
  }
}

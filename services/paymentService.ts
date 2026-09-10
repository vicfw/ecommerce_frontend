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

  async paymentVerify(payload: {
    trackId: string;
    orderId?: string | null;
    callbackSuccess?: string | null;
    callbackStatus?: string | null;
  }): Promise<Response<PaymentVerifyResponse>> {
    return axiosInstance().post(`${this.baseUrl}/verify`, {
      trackId: payload.trackId,
      orderId: payload.orderId,
      callbackSuccess: payload.callbackSuccess,
      callbackStatus: payload.callbackStatus,
    });
  }
}

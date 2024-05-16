import { AxiosResponse } from "axios";

export interface Response<T = unknown> extends AxiosResponse {
  data: { data: T; success: string; message: string };
}

import { AxiosResponse } from "axios";

export interface Response<T = unknown> extends AxiosResponse {
  data: { data: T; success: string; message: string };
}

export interface PaginatedResponse<T = unknown> extends AxiosResponse {
  data: {
    data: T[];
    success: string;
    message: string;
    total: number;
    page: number;
    hasMore: boolean;
  };
}

export interface FetchDataPaginatedResponse<T> {
  data: T;
  message: string;
  total?: number;
  page?: number;
  hasMore?: boolean;
}

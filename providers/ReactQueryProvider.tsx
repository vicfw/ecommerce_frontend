"use client";

import { removeClientSideCookie } from "@/lib/utils";
import { AxiosError } from "axios";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        console.log("error", error);
        if (error instanceof AxiosError) {
          if (error.response?.status === 403) {
            removeClientSideCookie("jwt");
          }
        }
      },
    },
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      onError: (error) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 403) {
            removeClientSideCookie("jwt");
          }
        }
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
      keepPreviousData: true,
    },
  },
});

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

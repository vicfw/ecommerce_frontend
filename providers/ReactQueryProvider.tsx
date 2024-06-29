"use client";

import { removeClientSideCookie } from "@/lib/utils";
import { AxiosError } from "axios";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {},
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

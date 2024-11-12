"use client";

import { removeClientSideCookie } from "@/lib/utils";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ReactNode } from "react";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.log("Query error", error);
      if (error instanceof AxiosError && error.response?.status === 403) {
        removeClientSideCookie("jwt");
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      console.log("Mutation error", error);
      if (error instanceof AxiosError && error.response?.status === 403) {
        removeClientSideCookie("jwt");
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 5 * 60 * 1000, // 10 minutes (GC time)
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

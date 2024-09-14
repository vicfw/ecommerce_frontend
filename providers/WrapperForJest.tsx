import { QueryClient, QueryClientProvider } from "react-query";
export const createQueryClientWrapperForJest = () => {
  // ✅ creates a new QueryClient for each test
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

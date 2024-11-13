import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

export const TestProvider = (children: React.ReactNode) => {
  const client = new QueryClient();

  return render(
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
};

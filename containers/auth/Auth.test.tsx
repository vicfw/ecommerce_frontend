import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { getByText, render, screen } from "@testing-library/react";
import AuthContainer from "./Auth";
import { TestProvider } from "@/lib/testUtils";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Auth Container", () => {
  it("renders component", () => {
    TestProvider(<AuthContainer />);
  });
});

describe("Auth Container Header", () => {
  it("displays login/register text when not in code view", () => {
    TestProvider(<AuthContainer />);

    expect(screen.getByText("ورود | ثبت‌ نام")).toBeInTheDocument();
    expect(
      screen.getByText("لطفا شماره موبایل یا ایمیل خود را وارد کنید")
    ).toBeInTheDocument();
  });
});

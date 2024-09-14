import { UserInfoModal } from "@/containers/profile/personal-info/components/UserInfoModal";
import { createQueryClientWrapperForJest } from "@/providers/WrapperForJest";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter: () => {},
  useSearchParams: () => ({
    get: () => null,
  }),
}));

const handleToggleDialog = jest.fn();

describe("user modal should render correctly", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render submit button", () => {
    render(
      <UserInfoModal
        handleToggleDialog={handleToggleDialog}
        openDialog={true}
      />,
      { wrapper: createQueryClientWrapperForJest() }
    );

    const submitButton = document.querySelector("button[type='submit']");

    expect(submitButton).toBeInTheDocument();
  });
});

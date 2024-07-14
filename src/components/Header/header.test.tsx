import { fireEvent, render } from "@testing-library/react";
import Header from "@/components/Header/Header";

const mockedMutate = jest.fn();

jest.mock("@/assets/logo.svg", () => "logo.svg");
jest.mock("@/hooks/useLogout.hook.ts", () => ({
  __esModule: true,
  default: () => ({
    mutate: mockedMutate,
  }),
}));

describe("Header component", () => {
  it("renders correctly", () => {
    const { getByText, getByAltText } = render(<Header/>);

    const logo = getByAltText("Logo");
    expect(logo).toHaveAttribute("src", "logo.svg");

    const logoutButton = getByText("Log Out");
    expect(logoutButton).toBeInTheDocument();
  });

  it("calls handleLogout when Log Out button is clicked", async () => {
    const { getByText } = render(<Header/>);

    const logoutButton = getByText("Log Out");

    fireEvent.click(logoutButton);

    expect(mockedMutate).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

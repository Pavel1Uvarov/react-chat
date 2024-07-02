import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/Header/Header";
import { selectLogout } from "@/stores/slices/auth.store";

jest.mock("@/stores/slices/auth.store", () => ({
  ...jest.requireActual("@/stores/slices/auth.store"),
  selectLogout: jest.fn(),
}));

jest.mock("@/assets/logo.svg", () => "logo.svg");

const mockedSelectLogout = selectLogout as jest.MockedFunction<
  typeof selectLogout
>;

describe("Header component", () => {
  beforeEach(() => {
    mockedSelectLogout.mockClear();
  });

  it("renders correctly", () => {
    const { getByText, getByAltText } = render(<Header />);

    const logo = getByAltText("Logo");
    expect(logo).toHaveAttribute("src", "logo.svg");

    const logoutButton = getByText("Log Out");
    expect(logoutButton).toBeInTheDocument();
  });

  it("calls handleLogout when Log Out button is clicked", async () => {
    const { getByText } = render(<Header />);

    const logoutButton = getByText("Log Out");

    await userEvent.click(logoutButton);

    expect(mockedSelectLogout).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

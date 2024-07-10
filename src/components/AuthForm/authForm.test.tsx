import AuthForm from "@/components/AuthForm/AuthForm.tsx";
import { act, fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const mockedSubmit = jest.fn();
const mockedError = new Error('Test Error');

describe("Auth Form Component", () => {
  it("Correct render sign in", () => {
    const { getByText } = render(
      <AuthForm type="SignIn" onSubmit={mockedSubmit} isLoading={false}/>,
      { wrapper: BrowserRouter }
    );

    expect(getByText("Sign in to your account")).toBeInTheDocument();
  });

  it("Correct render sign up", () => {
    const { getByText } = render(
      <AuthForm type="SignUp" onSubmit={mockedSubmit} isLoading={false}/>,
      { wrapper: BrowserRouter }
    );

    expect(getByText("Sign up for a new account")).toBeInTheDocument();
  });

  it("should submit form correct", async () => {
    const { getByTestId } = render(
      <AuthForm type="SignIn" onSubmit={mockedSubmit} isLoading={false}/>,
      { wrapper: BrowserRouter }
    );

    const form = getByTestId("form");

    await act(async () => {
      fireEvent.submit(form);
    });

    expect(mockedSubmit).toHaveBeenCalledTimes(1);
  });

  it("should display error message", () => {
    const { getByText } = render(
      <AuthForm
        type="SignIn"
        onSubmit={mockedSubmit}
        isLoading={false}
        error={mockedError}
      />,
      { wrapper: BrowserRouter }
    );

    expect(getByText("Test Error")).toBeInTheDocument();
  });

  it("should display loading spinner", () => {
    const { getByTestId } = render(
      <AuthForm
        type="SignIn"
        onSubmit={mockedSubmit}
        isLoading={true}
      />,
      { wrapper: BrowserRouter }
    );

    expect(getByTestId("loading")).toBeInTheDocument();
  })

  it("should disable submit button when loading", () => {
    const { getByTestId } = render(
      <AuthForm
        type="SignIn"
        onSubmit={mockedSubmit}
        isLoading={true}
      />,
      { wrapper: BrowserRouter }
    );

    const submitButton = getByTestId("submit-btn");

    expect(submitButton).toBeDisabled();
  })
});

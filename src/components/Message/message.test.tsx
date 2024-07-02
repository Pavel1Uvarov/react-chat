import { render, renderHook } from "@testing-library/react";
import ChatMessages from "@/__mocks__/messages.mock";
import { IMessage } from "@/types/message.interface";
import { useStoresSelectors } from "@/hooks/_storesSelectors.hook";
import user from "@/__mocks__/user.mock";
import { useMessage } from "./_message.hook";
import Message from "./Message";

jest.mock("@/hooks/_storesSelectors.hook");

const mockedUseStoresSelectors = useStoresSelectors as jest.MockedFunction<
  typeof useStoresSelectors
>;
describe("Message Component", () => {
  beforeEach(() => {
    mockedUseStoresSelectors.mockReturnValue({ user: user });
  });

  it("is Current user true", () => {
    const message: IMessage = ChatMessages[0];
    const { result } = renderHook(() => useMessage({ message }));
    expect(result.current.isCurrentUser).toBe(true);
  });

  it("is Current user false", () => {
    const message: IMessage = ChatMessages[1];
    const { result } = renderHook(() => useMessage({ message }));
    expect(result.current.isCurrentUser).toBe(false);
  });

  it("Render Component Correctly", () => {
    const message: IMessage = ChatMessages[1];

    const { getByText } = render(<Message message={message} />);

    expect(getByText(message.text)).toBeInTheDocument();
  });
});

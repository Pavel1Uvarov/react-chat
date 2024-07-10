import Chat from "@/components/Chat/Chat.tsx";
import { render } from "@testing-library/react";
// eslint-disable-next-line jest/no-mocks-import
import ChatMessages from "@/__mocks__/messages.mock.ts";
import { useScrollToBottom } from "@/hooks/useScrollToBottom.hook.ts";
import userEvent from '@testing-library/user-event'

const mockedScrollToBottom = jest.fn();

jest.mock("@/hooks/useScrollToBottom.hook.ts");

describe("Test Chat Component", () => {
  beforeEach(() => {
    (useScrollToBottom as jest.MockedFunction<any>).mockReturnValue({
      sectionRef: { current: null },
      showButton: true,
      scrollToBottom: mockedScrollToBottom,
    })
  })

  it("should render chat component", () => {
    const { getByTestId } = render(<Chat messages={[]} isLoading={false}/>);

    expect(getByTestId("chat-section")).toBeInTheDocument();
  })

  it("should render loading spinner when isLoading prop is true", () => {
    const { getByTestId } = render(<Chat messages={[]} isLoading={true}/>);

    expect(getByTestId("loading-spinner")).toBeInTheDocument();
  })

  it("should has scroll to bottom btn when showButton is true", () => {
    const { getByTestId } = render(<Chat messages={ChatMessages} isLoading={false}/>);

    expect(getByTestId('scroll-to-bottom-button')).toBeInTheDocument();
  })

  it("should call scrollToBottom when scroll to bottom btn is clicked", async () => {
    const user = userEvent.setup()

    const { getByTestId } = render(<Chat messages={[]} isLoading={false}/>);

    const btn = getByTestId('scroll-to-bottom-button');
    await user.click(btn);

    expect(mockedScrollToBottom).toHaveBeenCalledTimes(2);
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
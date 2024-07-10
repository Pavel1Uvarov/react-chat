import ChatForm from "@/components/ChatForm/ChatForm.tsx";
import { fireEvent, render } from "@testing-library/react";
import { useChatForm } from "@/components/ChatForm/_chatForm.hook.ts";

jest.mock("@/components/ChatForm/_chatForm.hook.ts");
jest.mock("@/hooks/useMessage.hook.ts", () => ({
  __esModule: true,
  default: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

const mockedHandleSubmit = jest.fn()

describe("Chat form component", () => {
  beforeEach(() => {
    (useChatForm as jest.MockedFunction<any>).mockReturnValue({
      message: 'Hello',
      handleSubmit: mockedHandleSubmit,
      setMessage: jest.fn(),
      isPending: false,
    })
    ()
  })

  it("should render chat form", () => {
    const { getByPlaceholderText, getByTestId } = render(<ChatForm/>)

    const input = getByPlaceholderText('Enter a message')
    const button = getByTestId('send-btn')

    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it("should handle input change", () => {
    const { getByPlaceholderText } = render(<ChatForm/>)

    const input = getByPlaceholderText('Enter a message')

    fireEvent.change(input, { target: { value: 'Hello' } })

    expect(input).toHaveDisplayValue('Hello')
  })

  it("should form submit", () => {
    const { getByTestId } = render(<ChatForm/>)

    const form = getByTestId('form')

    fireEvent.submit(form)

    expect(mockedHandleSubmit).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
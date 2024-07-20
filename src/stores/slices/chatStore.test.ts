import { act, renderHook } from "@testing-library/react";
import { useBoundStore } from "@/stores/useBoundStore.ts";
import type { IMessage } from "@/types/message.interface.ts";

describe('chatSlice tests', () => {
  it('should set messages and clear messages', () => {
    const messages: IMessage[] = [{
      id: '1',
      user_email: 'test@test.com',
      text: 'test text',
      user_id: '1',
      timestamp: new Date().toISOString()
    }]
    const { result } = renderHook(() => useBoundStore((state) => state));

    const { setMessages, clearMessages } = result.current;

    expect(result.current.messages).toEqual([]);

    act(() => {
      setMessages(messages);
    })

    expect(result.current.messages).toEqual(messages);

    act(() => {
      clearMessages();
    })

    expect(result.current.messages).toEqual([]);
  })
})
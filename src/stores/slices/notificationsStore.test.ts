import { act, renderHook } from "@testing-library/react";
import { useBoundStore } from "@/stores/useBoundStore.ts";

describe('NotificationsSlice tests', () => {
  it('should toggle play sound notification', () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useBoundStore((state) => state));

    const { togglePlaySoundNotification } = result.current;

    expect(result.current.playSoundNotification).toBe(false);

    act(() => {
      togglePlaySoundNotification();
    });

    expect(result.current.playSoundNotification).toBe(true);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.playSoundNotification).toBe(false);

    jest.useRealTimers();
  })
})
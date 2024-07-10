import { act, renderHook } from "@testing-library/react";
import { useBoundStore } from "@/stores/useBoundStore.ts"; // Путь к вашему файлу auth.store.ts

describe('createAuthSlice', () => {
  it('should set and clear token correctly', () => {
    const { result } = renderHook(() => useBoundStore((state) => state));

    const { setToken, clearToken } = result.current;

    expect(result.current.token).toBeNull();

    act(() => {
      setToken('123');
    });

    expect(result.current.token).toBe('123');

    act(() => {
      clearToken();
    });

    expect(result.current.token).toBeNull();
  });
});

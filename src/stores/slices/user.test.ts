import { act, renderHook } from "@testing-library/react";
import { useBoundStore } from "@/stores/useBoundStore.ts";
import testUser from "@/__mocks__/user.mock.ts";

describe('User slice tests', () => {
  it('should initial be null', () => {
    const { result } = renderHook(() => useBoundStore((state) => state));

    expect(result.current.user).toBe(null);
  })

  it('should set user and clear', () => {
    const { result } = renderHook(() => useBoundStore((state) => state));

    const { setUser, clearUser } = result.current

    act(() => {
      setUser(testUser)
    })

    expect(result.current.user).toEqual(testUser)

    act(() => {
      clearUser()
    })

    expect(result.current.user).toBe(null)
  })
})
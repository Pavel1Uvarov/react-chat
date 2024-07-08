import { useBoundStore } from "@/stores/useBoundStore.ts";
import { selectSetToken } from "@/stores/slices/auth.store.ts";
import { useMutation } from "@tanstack/react-query";
import { IAuthFormInterface, signUpUser } from "@/api/authApi.ts";

const useSignUpHook = () => {
  const setToken = useBoundStore(selectSetToken);

  return useMutation({
    mutationFn: async ({ email, password }: IAuthFormInterface) => {
      return await signUpUser({ email, password });
    },
    onSuccess: (data) => {
      if (data?.session?.access_token) setToken(data?.session?.access_token);
    },
  })
}

export default useSignUpHook;
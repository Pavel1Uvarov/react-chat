import { IAuthFormInterface, signInUser } from "@/api/authApi.ts";
import { selectSetToken } from "@/stores/slices/auth.store";
import { useBoundStore } from "@/stores/useBoundStore";
import { useMutation } from "@tanstack/react-query";

const useSignInHook = () => {
  const setToken = useBoundStore(selectSetToken);

  return useMutation({
    mutationFn: async ({ email, password }: IAuthFormInterface) => await signInUser({ email, password }),
    onSuccess: (data) => {
      if (data?.session?.access_token) setToken(data?.session?.access_token);
    },
  });
};

export default useSignInHook;

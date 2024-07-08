import { useBoundStore } from "@/stores/useBoundStore.ts";
import { selectSetToken } from "@/stores/slices/auth.store.ts";
import { useMutation } from "@tanstack/react-query";
import { IAuthFormInterface, signUpUser } from "@/api/authApi.ts";

const useSignUp = () => {
  const setToken = useBoundStore(selectSetToken);

  return useMutation({
    mutationFn: async ({ email, password }: IAuthFormInterface) => {
      try {
        return await signUpUser({ email, password });
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data?.session?.access_token) setToken(data?.session?.access_token);
    },
  })
}

export default useSignUp;
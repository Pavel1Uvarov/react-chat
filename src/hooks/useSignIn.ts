import { IAuthInterface, signInUser } from "@/api/authApi";
import { selectSetToken } from "@/stores/slices/auth.store";
import { useBoundStore } from "@/stores/useBoundStore";
import { useMutation } from "@tanstack/react-query";

const useSignIn = () => {
  const setToken = useBoundStore(selectSetToken);

  return useMutation({
    mutationFn: async ({ email, password }: IAuthInterface) => {
      try {
        return await signInUser({ email, password });
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data?.session?.access_token) setToken(data?.session?.access_token);
    },
  });
};

export default useSignIn;

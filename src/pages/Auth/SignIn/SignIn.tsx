import useSignInHook from "@/hooks/useSignIn.hook.ts";
import AuthForm from "@/components/AuthForm/AuthForm.tsx";

const SignIn = () => {
  const { mutate, isPending, error } = useSignInHook();

  return <AuthForm
    type="SignIn"
    onSubmit={mutate}
    isLoading={isPending}
    error={error}
  />
};

export default SignIn;

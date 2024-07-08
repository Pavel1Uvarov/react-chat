import AuthForm from "@/components/AuthForm/AuthForm";
import useSignUpHook from "@/hooks/useSignUp.hook.ts";

const SignUp = () => {
  const { mutate, isPending, error } = useSignUpHook();

  return <AuthForm type="SignUp" onSubmit={mutate} isLoading={isPending} error={error}/>
};

export default SignUp;

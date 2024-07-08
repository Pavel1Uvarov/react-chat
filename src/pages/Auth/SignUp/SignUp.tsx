import AuthForm from "@/components/AuthForm/AuthForm";
import useSignUp from "@/hooks/useSignUp.ts";

const SignUp = () => {
  const { mutate, isPending, error } = useSignUp();

  return <AuthForm type="SignUp" onSubmit={mutate} isLoading={isPending} error={error}/>
};

export default SignUp;

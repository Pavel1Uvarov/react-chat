import AuthForm from "../../../components/AuthForm/AuthForm";
import useSignIn from "@/hooks/useSignIn";

const SignIn = () => {
  const { mutate, isPending, error } = useSignIn();

  return (
    <>
      <AuthForm
        type="SignIn"
        onSubmit={mutate}
        isLoading={isPending}
        error={error}
      />
    </>
  );
};

export default SignIn;

import AuthForm from "@/components/AuthForm/AuthForm";
import { selectSignUp } from "@/stores/auth.store";
import { useBoundStore } from "@/stores/useBoundStore";

const SignUp = () => {
  const onSubmit = useBoundStore(selectSignUp);

  return (
    <>
      <AuthForm type="SignUp" onSubmit={onSubmit} />
    </>
  );
};

export default SignUp;

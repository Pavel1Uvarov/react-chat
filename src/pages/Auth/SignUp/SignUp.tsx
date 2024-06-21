import AuthForm from "@/components/AuthForm/AuthForm";
import { selectSignUp, useAuthStore } from "@/stores/authStore.store";

const SignUp = () => {
  const onSubmit = useAuthStore(selectSignUp);

  return (
    <>
      <AuthForm type="SignUp" onSubmit={onSubmit} />
    </>
  );
};

export default SignUp;

import { selectSignIn, useAuthStore } from "@/stores/authStore.store";
import AuthForm from "../../../components/AuthForm/AuthForm";

const SignIn = () => {
  const onSubmit = useAuthStore(selectSignIn);

  return (
    <>
      <AuthForm type="SignIn" onSubmit={onSubmit} />
    </>
  );
};

export default SignIn;

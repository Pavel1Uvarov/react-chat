import { selectSignIn } from "@/stores/slices/auth.store";
import AuthForm from "../../../components/AuthForm/AuthForm";
import { useBoundStore } from "@/stores/useBoundStore";

const SignIn = () => {
  const onSubmit = useBoundStore(selectSignIn);

  return (
    <>
      <AuthForm type="SignIn" onSubmit={onSubmit} />
    </>
  );
};

export default SignIn;

import { useState, useCallback, FormEvent, useMemo } from "react";

export interface IAuthFormProps {
  type: "SignIn" | "SignUp";
  isLoading?: boolean;
  error?: Error | null;
  onSubmit: ({ email, password }: { email: string; password: string }) => void;
}

export const useAuthForm = ({ type, onSubmit }: IAuthFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onSubmit({ email, password });
    },
    [email, password]
  );

  const isTypeSignIn = useMemo(() => {
    return type === "SignIn";
  }, [type]);

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
    isTypeSignIn,
  };
};

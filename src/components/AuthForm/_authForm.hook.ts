import {
  selectLoading,
  selectError,
  selectSetError,
} from "@/stores/auth.store";
import { useBoundStore } from "@/stores/useBoundStore";
import { useState, useCallback, FormEvent, useMemo, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export interface IAuthFormProps {
  type: "SignIn" | "SignUp";
  onSubmit: ({ email, password }: { email: string; password: string }) => void;
}

export const useAuthForm = ({ type, onSubmit }: IAuthFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const loading = useBoundStore(useShallow(selectLoading));
  const error = useBoundStore(useShallow(selectError));
  const setError = useBoundStore(selectSetError);

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

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, [type]);

  return {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    handleSubmit,
    isTypeSignIn,
  };
};

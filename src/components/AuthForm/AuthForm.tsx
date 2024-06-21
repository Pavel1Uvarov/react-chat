import { FormEvent, useCallback, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

import {
  useAuthStore,
  selectLoading,
  selectError,
} from "@/stores/authStore.store";

interface IAuthFormProps {
  type: "SignIn" | "SignUp";
  onSubmit: ({ email, password }: { email: string; password: string }) => void;
}

const AuthForm = ({ type, onSubmit }: IAuthFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const loading = useAuthStore(selectLoading);
  const error = useAuthStore(selectError);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onSubmit({ email, password });
    },
    [email, password]
  );

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white min-w-96 shadow-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {type === "SignIn"
            ? "Sign in to your account"
            : "Sign up for a new account"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email address</Label>
            <div className="mt-2">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
          </div>
          <Button className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {type === "SignIn" ? "Sign in" : "Sign up"}
          </Button>
          <p className={cn("text-red-500", error ? "" : "hidden")}>{error}</p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

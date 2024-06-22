import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

import { Link } from "react-router-dom";
import { IAuthFormProps, useAuthForm } from "./_authForm.hook";

const AuthForm = ({ type, onSubmit }: IAuthFormProps) => {
  const {
    email,
    password,
    handleSubmit,
    setEmail,
    setPassword,
    isTypeSignIn,
    loading,
    error,
  } = useAuthForm({ type, onSubmit });

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white min-w-96 shadow-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {isTypeSignIn
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
          <Button className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isTypeSignIn ? "Sign in" : "Sign up"}
          </Button>
          <p className="text-center">
            {isTypeSignIn ? (
              <>
                Haven't account?
                <Link
                  to="/auth/sign-up"
                  className="text-blue-500 hover:text-blue-600 ml-1"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have account?
                <Link
                  to="/auth/sign-in"
                  className="text-blue-500 hover:text-blue-600 ml-1"
                >
                  Sign in
                </Link>
              </>
            )}
          </p>

          <p className={cn("text-red-500 text-center", error ? "" : "hidden")}>
            {error}
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

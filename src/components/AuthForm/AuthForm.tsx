import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes.ts";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { type IAuthFormProps, useAuthForm } from "@/components/AuthForm/_authForm.hook.ts";

const AuthForm = ({ type, onSubmit, isLoading, error }: IAuthFormProps) => {
  const { email, password, handleSubmit, setEmail, setPassword, isTypeSignIn } =
    useAuthForm({ type, onSubmit });

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
        <form className="space-y-6" data-testid="form" onSubmit={handleSubmit}>
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
          <Button className="w-full" data-testid="submit-btn" disabled={isLoading}>
            {isLoading && <Loader2 data-testid="loading" className="mr-2 h-4 w-4 animate-spin"/>}
            {isTypeSignIn ? "Sign in" : "Sign up"}
          </Button>
          <div className="text-center">
            {isTypeSignIn ? "Don't have an account?" : "Already have an account?"}
            <Link
              to={isTypeSignIn ? ROUTES.SIGN_UP : ROUTES.SIGN_IN}
              className="text-blue-500 hover:text-blue-600 ml-1"
            >
              {isTypeSignIn ? 'Sign up' : 'Sign in'}
            </Link>
          </div>

          <p className={cn("text-red-500 text-center", error ? "" : "hidden")}>
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

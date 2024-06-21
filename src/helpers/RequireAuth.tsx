import { selectToken, useAuthStore } from "@/stores/auth.store";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const token = useAuthStore(selectToken);

  if (!token) {
    return <Navigate to="/auth/sign-in" />;
  }

  return children;
};

export default RequireAuth;

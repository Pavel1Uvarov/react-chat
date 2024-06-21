import { selectToken, useAuthStore } from "@/stores/auth.store";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const IsAuthUser = ({ children }: { children: ReactNode }) => {
  const token = useAuthStore(selectToken);

  if (token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default IsAuthUser;

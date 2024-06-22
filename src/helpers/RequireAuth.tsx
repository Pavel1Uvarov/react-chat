import { useEffect } from "react";
import { selectToken, useAuthStore } from "@/stores/auth.store";
import {
  selectFetchCurrentUser,
  selectUser,
  useUserStore,
} from "@/stores/user.store";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const fetchUser = useUserStore(selectFetchCurrentUser);
  const user = useUserStore(selectUser);
  const token = useAuthStore(selectToken);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    await fetchUser();
  }

  if (!user && !token) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <>{children}</>; // Wrap children in a fragment to avoid potential issues
};

export default RequireAuth;

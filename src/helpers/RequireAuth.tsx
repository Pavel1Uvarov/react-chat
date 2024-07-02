import { useEffect } from "react";
import { selectToken } from "@/stores/slices/auth.store";
import { selectFetchCurrentUser, selectUser } from "@/stores/user.store";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useBoundStore } from "@/stores/useBoundStore";
import { useShallow } from "zustand/react/shallow";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const fetchUser = useBoundStore(selectFetchCurrentUser);
  const user = useBoundStore(useShallow(selectUser));
  const token = useBoundStore(useShallow(selectToken));

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    await fetchUser();
  }

  if (!user && !token) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <>{children}</>;
};

export default RequireAuth;

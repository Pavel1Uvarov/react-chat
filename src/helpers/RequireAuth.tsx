import type { ReactNode } from "react";
import { selectToken } from "@/stores/slices/auth.store";
import { selectUser } from "@/stores/slices/user.store";
import { Navigate } from "react-router-dom";
import { useBoundStore } from "@/stores/useBoundStore";
import { useShallow } from "zustand/react/shallow";
import useUserHook from "@/hooks/useUser.hook.ts";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const user = useBoundStore(useShallow(selectUser));
  const token = useBoundStore(useShallow(selectToken));

  useUserHook()

  if (!user && !token) {
    return <Navigate to="/auth/sign-in"/>;
  }

  return <>{children}</>;
};

export default RequireAuth;

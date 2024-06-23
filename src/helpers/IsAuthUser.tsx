import { selectToken } from "@/stores/auth.store";
import { useBoundStore } from "@/stores/useBoundStore";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

const IsAuthUser = ({ children }: { children: ReactNode }) => {
  const token = useBoundStore(useShallow(selectToken));

  if (token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default IsAuthUser;

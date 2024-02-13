import { ReactNode } from "react";
import { useAppSelector } from "../../redex/hook";
import { useCurrentToken } from "../../redex/store";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return children;
};

export default ProtectedRoutes;

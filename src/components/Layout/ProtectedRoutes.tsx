import { TUser } from "../../types/authSlice.Type";
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redex/hook';
import { useCurrentToken } from '../../redex/store';
import { verifyToken } from '../../utils/veryfyToken';
import { logout } from '../../redex/feature/auth/authSlice';


type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }
  const dispatch = useAppDispatch();

  if (role !== undefined && role !== (user as TUser)?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
import { jwtDecode } from "jwt-decode";
import { TUser } from "../types/authSlice.Type";

export const verifyToken = (token: string): TUser => {
  return jwtDecode(token);
};

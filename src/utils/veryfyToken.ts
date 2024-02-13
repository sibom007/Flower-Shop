import { jwtDecode } from "jwt-decode";

export const varyfyToken = (token: string) => {
  return jwtDecode(token);
};

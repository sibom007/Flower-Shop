export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
  _id: string;
};

export type TtableUserData = {
  role: string;
  _id: string;
  username:string,
   email:string,
};

export type TinitialState = {
  user: null | TUser;
  token: null | string;
};

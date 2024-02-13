export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
  _id: string;
};

export type TinitialState = {
  user: null | TUser;
  token: null | string;
};

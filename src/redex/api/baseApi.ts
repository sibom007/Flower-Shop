import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  BaseQueryApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { DefaultOptionType } from "antd/es/cascader";
import { logout } from "../feature/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://asssmient-5-server.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

const baseQuerywithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefaultOptionType
> = async (args, api, extraOptions): Promise<any> => {
  try {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
      api.dispatch(logout());
      result = await baseQuery(args, api, extraOptions);
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuerywithRefreshToken,
  endpoints: () => ({}),
});

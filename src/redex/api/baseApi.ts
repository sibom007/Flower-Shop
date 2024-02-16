import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  BaseQueryApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { DefaultOptionType } from "antd/es/cascader";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
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
      toast.error((result?.error?.data as { message: string }).message);
      result = await baseQuery(args, api, extraOptions);
    }
    if (result?.error?.status === 404) {
      toast.error((result?.error?.data as { message: string }).message);
      result = await baseQuery(args, api, extraOptions);
    }
    if (result?.error?.status === 400) {
      toast.error((result?.error?.data as { message: string }).message);
      result = await baseQuery(args, api, extraOptions);
    }
    if (result?.error?.status === 500) {
      toast.error((result?.error?.data as { message: string }).message);
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
  tagTypes: ["Bulkdelete", "SingleDelete","Updateflower","Sell"],
  endpoints: () => ({}),
});

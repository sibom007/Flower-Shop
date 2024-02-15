import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registers: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    TotalUser: builder.query({
      query: () => ({
        url: "/auth/TotalUser",
        method: "GET",
      }),
    }),

    TodayUser: builder.query({
      query: () => ({
        url: "/auth/TodayUser",
        method: "GET",
      }),
    }),


  }),
});

export const { useLoginMutation, useRegistersMutation, useTotalUserQuery,useTodayUserQuery } = authApi;

export default authApi;

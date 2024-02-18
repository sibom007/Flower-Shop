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

    UpdateUserRole: builder.mutation({
      query: (args) => {
        return {
          url: `/auth/updateRole`,
          method: "PUT",
          body: args
        }
      },
      invalidatesTags: ["userRole"]
    }),

    SingleUser: builder.query({
      query: (id) => {
        return{
        url: `/auth/SingleUser/${id}`,
        method: "GET",
      }},
      providesTags:["point"]
    }),

    TotalUser: builder.query({
      query: () => ({
        url: "/auth/TotalUser",
        method: "GET",
      }),
      providesTags:["userRole"]
    }),

    TodayUser: builder.query({
      query: () => ({
        url: "/auth/TodayUser",
        method: "GET",
      }),
    }),


  }),
});

export const { useLoginMutation, useRegistersMutation, useTotalUserQuery, useTodayUserQuery, useUpdateUserRoleMutation,useSingleUserQuery } = authApi;

export default authApi;

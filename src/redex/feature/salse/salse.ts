import { baseApi } from "../../api/baseApi";

const salseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addsales: builder.mutation({
      query: (userInfo) => ({
        url: "/Flower/sales",
        method: "POST",
        body: userInfo,
      }),
    }),
    salesinDay: builder.query({
      query: () => ({
        url: "/Flower/sales/daily",
        method: "GET",
      }),
    }),
    salesinMonth: builder.query({
      query: () => ({
        url: "/Flower/sales/month",
        method: "GET",
      }),
    }),
    salesinYear: builder.query({
      query: () => ({
        url: "/Flower/sales/year",
        method: "GET",
      }),
    }),
    salesinWeek: builder.query({
      query: () => ({
        url: "/Flower/sales/week",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddsalesMutation,
  useSalesinDayQuery,
  useSalesinMonthQuery,
  useSalesinWeekQuery,
  useSalesinYearQuery,
} = salseApi;

export default salseApi;

import { baseApi } from "../../api/baseApi";

const salseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addsales: builder.mutation({
      query: (userInfo) => ({
        url: "/Flower/sales",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Sell", "Day", "Month", "Week", "Year"],
    }),
    salesinDay: builder.query({
      query: () => ({
        url: "/Flower/sales/daily",
        method: "GET",
      }),
      providesTags: ["Day"]
    }),
    salesinMonth: builder.query({
      query: () => ({
        url: "/Flower/sales/month",
        method: "GET",
      }),
      providesTags: ["Month"]
    }),
    salesinYear: builder.query({
      query: () => ({
        url: "/Flower/sales/year",
        method: "GET",
      }),
      providesTags: ["Year"]
    }),

    salesinWeek: builder.query({
      query: () => ({
        url: "/Flower/sales/week",
        method: "GET",
      }),
      providesTags: ["Week"]

    }),

    PointUpdate: builder.mutation({
      query: (args) => {
        return {
          url: `/Flower/sales/pointUpdate`,
          method: "PATCH",
          body: args
        }
      },
    }),
  }),
});

export const {
  useAddsalesMutation,
  useSalesinDayQuery,
  useSalesinMonthQuery,
  useSalesinWeekQuery,
  useSalesinYearQuery,
  usePointUpdateMutation
} = salseApi;

export default salseApi;

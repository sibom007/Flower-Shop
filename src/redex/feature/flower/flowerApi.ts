import { baseApi } from "../../api/baseApi";

const flowerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addflower: builder.mutation({
      query: (userInfo) => ({
        url: "/Flower",
        method: "POST",
        body: userInfo,
      }),
    }),

    getflower: builder.query({
      query: (filters) => {
        let url = '/Flower';

        if (filters.Searchfild && filters.search) {
          url += `?${filters.Searchfild}=${filters.search}`;
        }
        return {
          url: url,
          method: "GET",
        };
      },
      providesTags: ['Bulkdelete', "SingleDelete", "Updateflower","Sell"],
    }),

    getUserflowerById: builder.query({
      query: (id) => ({
        url: `/Flower/userId/${id}`,
        method: "GET",
      }),
    }),

    DeleteFlowerById: builder.mutation({
      query: (userinfo) => {
        return {
          url: `/Flower/${userinfo.id}`,
          method: "PUT",
        }
      },
      invalidatesTags: ["SingleDelete"]
    }),

    SingleflowerById: builder.query({
      query: (id) => {
        return {
          url: `/Flower/${id.FlowerId}`,
        method: "GET",
        }
      },
    }),

    updateflower: builder.mutation({
      query: (userInfo) => ({
        url: `/Flower/${userInfo.id}`,
        method: "PATCH",
        body: userInfo,
      }),
      invalidatesTags: ["Updateflower"]
    }),

    BulkDeleteflower: builder.mutation({
      query: (userInfo) => {
        return {
          url: `/Flower`,
          method: "PUT",
          body: userInfo,
        };
      },
      invalidatesTags: ["Bulkdelete"]
    }),
  }),

});

export const {
  useAddflowerMutation,
  useGetflowerQuery,
  useGetUserflowerByIdQuery,
  useDeleteFlowerByIdMutation,
  useSingleflowerByIdQuery,
  useUpdateflowerMutation,
  useBulkDeleteflowerMutation,
} = flowerApi;

export default flowerApi;

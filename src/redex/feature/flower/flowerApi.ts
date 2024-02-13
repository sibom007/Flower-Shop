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
        return {
          url: `/Flower?${filters.Searchfild}=${filters.search}`,
          method: "GET",
        };
      },
    }),
    getUserflowerById: builder.query({
      query: (id) => ({
        url: `/Flower/userId/${id}`,
        method: "GET",
      }),
    }),
    DeleteFlowerById: builder.mutation({
      query: ({ id, ...userInfo }) => ({
        url: `/Flower/${id}`,
        method: "PUT",
        body: userInfo,
      }),
    }),
    SingleflowerById: builder.query({
      query: (id) => ({
        url: `/Flower/${id}`,
        method: "GET",
      }),
    }),
    updateflower: builder.mutation({
      query: (userInfo) => ({
        url: `/Flower/${userInfo.id}`,
        method: "PATCH",
        body: userInfo,
      }),
    }),
    BulkDeleteflower: builder.mutation({
      query: (userInfo) => {
        return {
          url: `/Flower`,
          method: "PUT",
          body: userInfo,
        };
      },
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

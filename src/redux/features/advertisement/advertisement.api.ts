import { baseApi } from "../../api/baseApi";

export const advertisementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdvertisements: builder.query({
      query: (queryParams) => {
        const queryString = new URLSearchParams(queryParams).toString();
        return {
          url: `/advertisement/all-advertisement?${queryString}`,
          method: "GET",
        };
      },
    }),

    getSingleAdvertisement: builder.query({
      query: (slug) => ({
        url: `/advertisement/single-advertisement/${slug}`,
        method: "GET",
      }),
    }),

    // POST create new
    createAdvertisement: builder.mutation({
      query: (body) => ({
        url: `/advertisement/create-advertisement`,
        method: "POST",
        body,
      }),
    }),

    updateAdvertisement: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/advertisement/update-advertisement/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteAdvertisement: builder.mutation({
      query: (id) => ({
        url: `/advertisement/delete-advertisement/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllAdvertisementsQuery,
  useGetSingleAdvertisementQuery,
  useCreateAdvertisementMutation,
  useUpdateAdvertisementMutation,
  useDeleteAdvertisementMutation,
} = advertisementApi;

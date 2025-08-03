import { baseApi } from "../../api/baseApi";

export const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBannerContents: builder.query({
      query: (queryParams) => {
        const queryString = new URLSearchParams(queryParams).toString();
        return {
          url: `/content/all-content?${queryString}`,
          method: "GET",
        };
      },
    }),
    getSingleBannerContent: builder.query({
      query: (slug) => ({
        url: `/content/single-content/${slug}`,
        method: "GET",
      }),
    }),
    createBannerContent: builder.mutation({
      query: (body) => ({
        url: `/content/create-content`,
        method: "POST",
        body,
      }),
    }),
    updateBannerContent: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/content/update-content/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteBannerContent: builder.mutation({
      query: (id) => ({
        url: `/content/delete-content/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllBannerContentsQuery,
  useGetSingleBannerContentQuery,
  useCreateBannerContentMutation,
  useUpdateBannerContentMutation,
  useDeleteBannerContentMutation,
} = contentApi;

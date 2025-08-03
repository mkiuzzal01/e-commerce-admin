import { baseApi } from "../../api/baseApi";

const variantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create variant:
    createVariant: builder.mutation({
      query: (data) => ({
        url: "/variant/crate-variant",
        method: "POST",
        body: data,
      }),
    }),
    updateVariant: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/variant/update-variant/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteVariant: builder.mutation({
      query: (id: string) => ({
        url: `/variant/delete-variant/${id}`,
        method: "DELETE",
      }),
    }),
    //get all variant:
    allVariant: builder.query({
      query: () => ({
        url: "/variant/all-variant",
        method: "GET",
      }),
    }),
    //get single variant:
    singleVariant: builder.query({
      query: (slug: string) => ({
        url: `/variant/single-variant/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateVariantMutation,
  useUpdateVariantMutation,
  useDeleteVariantMutation,
  useAllVariantQuery,
  useSingleVariantQuery,
} = variantApi;

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
      query: (id: string) => ({
        url: `/variant/update-variant/${id}`,
        method: "PATCH",
        // body: data,
      }),
    }),
    deleteVariant: builder.mutation({
      query: (id: string) => ({
        url: `/variant/delete-variant/${id}`,
        method: "DELETE",
        // body: data,
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
      query: (id: string) => ({
        url: `/variant/single-variant/${id}`,
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

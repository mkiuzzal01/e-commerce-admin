import { baseApi } from "../../api/baseApi";

const sellerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create user:
    createSeller: builder.mutation({
      query: (data) => ({
        url: "/user/create-seller",
        method: "POST",
        body: data,
      }),
    }),
    //update seller:
    updateSeller: builder.mutation({
      query: ({ id, ...seller }) => ({
        url: `/seller/update-seller/${id}`,
        method: "PATCH",
        body: seller,
      }),
    }),
    //delete seller:
    deleteSeller: builder.mutation({
      query: (_id: string) => ({
        url: `/seller/update-seller/${_id}`,
        method: "DELETE",
      }),
    }),

    //get all seller:
    allSeller: builder.query({
      query: () => ({
        url: "/seller/all-seller",
        method: "GET",
      }),
    }),

    //get single by id:
    getSellerById: builder.query({
      query: (_id: string) => ({
        url: `/seller/single-seller/${_id}`,
        method: "GET",
      }),
    }),
    //get single  seller:
    singleSeller: builder.query({
      query: (slug: string) => ({
        url: `/seller/single-seller/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateSellerMutation,
  useUpdateSellerMutation,
  useDeleteSellerMutation,
  useAllSellerQuery,
  useSingleSellerQuery,
  useGetSellerByIdQuery,
} = sellerApi;

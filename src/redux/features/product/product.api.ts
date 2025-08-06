import { baseApi } from "../../api/baseApi";

const ProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allProducts: builder.query({
      query: (queryParams: Record<string, any>) => {
        const queryString = new URLSearchParams(queryParams).toString();
        return {
          url: `/product/all-product?${queryString}`,
          method: "GET",
        };
      },
    }),

    // Get single product by slug
    singleProductBySlug: builder.query({
      query: (slug: string) => ({
        url: `/product/single-product/${slug}`,
        method: "GET",
      }),
    }),

    // Get single product by ID
    singleProductById: builder.query({
      query: (id: string) => ({
        url: `/product/single-product/${id}`,
        method: "GET",
      }),
    }),

    // Create new product
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/product/create-product",
        method: "POST",
        body: productData,
      }),
    }),

    // Update product
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/product/update-product/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    // Delete product
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/product/delete-product/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAllProductsQuery,
  useSingleProductBySlugQuery,
  useSingleProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = ProductApi;

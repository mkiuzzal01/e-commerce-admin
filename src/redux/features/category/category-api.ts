import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubCategory: builder.mutation({
      query: (data) => ({
        url: "/category/create-sub-category",
        method: "POST",
        body: data,
      }),
    }),
    updateSubCategory: builder.mutation({
      query: (id: string) => ({
        url: `/category/update-sub-category/${id}`,
        method: "PATCH",
        // body: data,
      }),
    }),
    deleteSubCategory: builder.mutation({
      query: (id: string) => ({
        url: `/category/delete-sub-category/${id}`,
        method: "DELETE",
      }),
    }),
    allSubCategory: builder.query({
      query: () => ({
        url: "/category/all-sub-category",
        method: "GET",
      }),
    }),
    singleSubCategory: builder.query({
      query: (id: string) => ({
        url: `/category/single-sub-category${id}`,
        method: "GET",
      }),
    }),
    createMainCategory: builder.mutation({
      query: (data) => ({
        url: "/category/create-category",
        method: "POST",
        body: data,
      }),
    }),
    updateMainCategory: builder.mutation({
      query: (id: string) => ({
        url: `/category/update-category/${id}`,
        method: "PATCH",
        // body: data,
      }),
    }),
    deleteMainCategory: builder.mutation({
      query: (id: string) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
      }),
    }),
    allMainCategory: builder.query({
      query: () => ({
        url: "category/all-category",
        method: "GET",
      }),
    }),
    singleMainCategory: builder.query({
      query: (id) => ({
        url: `category/single-category/${id}`,
        method: "GET",
      }),
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category/create-category",
        method: "POST",
        body: data,
      }),
    }),
    updateCategory: builder.mutation({
      query: (id: string) => ({
        url: `/category/update-category/${id}`,
        method: "PATCH",
        // body:
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
      }),
    }),
    allCategory: builder.query({
      query: () => ({
        url: "/category/all-category",
        method: "GET",
      }),
    }),
    singleCategory: builder.query({
      query: (id: string) => ({
        url: `/category/single-category/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAllSubCategoryQuery,
  useSingleSubCategoryQuery,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,

  useAllMainCategoryQuery,
  useSingleMainCategoryQuery,
  useDeleteMainCategoryMutation,
  useUpdateMainCategoryMutation,

  useAllCategoryQuery,
  useSingleCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;

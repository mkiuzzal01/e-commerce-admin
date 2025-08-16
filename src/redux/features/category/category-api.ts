/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Main Category
    createMainCategory: builder.mutation({
      query: (data) => ({
        url: "/category/create-main-category",
        method: "POST",
        body: data,
      }),
    }),
    updateMainCategory: builder.mutation({
      query: ({ slug, ...data }) => ({
        url: `/category/update-main-category/${slug}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteMainCategory: builder.mutation({
      query: (id: string) => ({
        url: `/category/delete-main-category/${id}`,
        method: "DELETE",
      }),
    }),
    allMainCategory: builder.query({
      query: ({ queryParams = {} }: { queryParams?: Record<string, any> }) => {
        const queryString = new URLSearchParams(queryParams).toString();
        return {
          url: `/category/all-main-category?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["all-main-category"],
    }),

    singleMainCategory: builder.query({
      query: (slug: string) => ({
        url: `/category/single-main-category/${slug}`,
        method: "GET",
      }),
      providesTags: ["single-main-category"],
    }),

    // Category
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category/create-category",
        method: "POST",
        body: data,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ slug, ...data }) => ({
        url: `/category/update-category/${slug}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
      }),
    }),

    allCategory: builder.query({
      query: ({ queryParams = {} }: { queryParams?: Record<string, any> }) => {
        const queryString = new URLSearchParams(queryParams).toString();
        return {
          url: `/category/all-category?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["all-category"],
    }),

    singleCategory: builder.query({
      query: (slug: string) => ({
        url: `/category/single-category/${slug}`,
        method: "GET",
      }),
      providesTags: ["single-category"],
    }),

    // Sub Category
    createSubCategory: builder.mutation({
      query: (data) => ({
        url: "/category/create-sub-category",
        method: "POST",
        body: data,
      }),
    }),
    updateSubCategory: builder.mutation({
      query: ({ slug, ...data }) => ({
        url: `/category/update-sub-category/${slug}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteSubCategory: builder.mutation({
      query: (id: string) => ({
        url: `/category/delete-sub-category/${id}`,
        method: "DELETE",
      }),
    }),
    allSubCategory: builder.query({
      query: ({ queryParams = {} }: { queryParams?: Record<string, any> }) => {
        const queryString = new URLSearchParams(queryParams).toString();
        return {
          url: `/category/all-sub-category?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["all-sub-category"],
    }),

    singleSubCategory: builder.query({
      query: (slug: string) => ({
        url: `/category/single-sub-category/${slug}`,
        method: "GET",
      }),
      providesTags: ["single-sub-category"],
    }),
  }),
});

export const {
  // Sub Category
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useAllSubCategoryQuery,
  useSingleSubCategoryQuery,

  // Main Category
  useCreateMainCategoryMutation,
  useUpdateMainCategoryMutation,
  useDeleteMainCategoryMutation,
  useAllMainCategoryQuery,
  useSingleMainCategoryQuery,

  // Category
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAllCategoryQuery,
  useSingleCategoryQuery,
} = categoryApi;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get all users:
    allUsers: builder.query({
      query: ({ queryParams = {} }: { queryParams?: Record<string, any> }) => {
        const queryString = new URLSearchParams(queryParams).toString();
        return {
          url: `/user/all-user?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["all-user"],
    }),

    //this is single users by slug:
    singleUserBySlug: builder.query({
      query: (slug: string) => ({
        url: `/user/single-user/${slug}`,
        method: "GET",
      }),
      providesTags: ["single-user"],
    }),

    singleUser: builder.query({
      query: (id: string) => ({
        url: `/user/user/${id}`,
        method: "GET",
      }),
      providesTags: ["single-user"],
    }),

    userStats: builder.query({
      query: () => ({
        url: `/user/user-stats`,
        method: "GET",
      }),
      providesTags: ["user-stats"],
    }),

    //update user
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/user/update-user/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useAllUsersQuery,
  useSingleUserBySlugQuery,
  useSingleUserQuery,
  useUserStatsQuery,
  useUpdateUserMutation,
} = userApi;

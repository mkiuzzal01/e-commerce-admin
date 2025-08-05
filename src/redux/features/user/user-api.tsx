import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get all users:
    allUsers: builder.query({
      query: (queryParams: Record<string, any>) => {
        const queryString = new URLSearchParams(queryParams).toString();
        return {
          url: `/user/all-user?${queryString}`,
          method: "GET",
        };
      },
    }),

    //this is single users by slug:
    singleUserBySlug: builder.query({
      query: (slug: string) => ({
        url: `/user/single-user/${slug}`,
        method: "GET",
      }),
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
  useUpdateUserMutation,
} = userApi;

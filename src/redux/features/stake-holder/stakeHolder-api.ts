import type { TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const stakeHolderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create stakeHolder:
    createStakeHolder: builder.mutation({
      query: (data) => ({
        url: "/user/create-stakeholder",
        method: "POST",
        body: data,
      }),
    }),

    //update stack holder:
    updateStackHolder: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/stakeholder/update-stakeholder/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    //delete stack holder:
    deleteStackHolder: builder.mutation({
      query: (_id) => ({
        url: `/stakeholder/delete-stakeholder/${_id}`,
        method: "DELETE",
      }),
    }),
    //get all stack holder:
    allStakeHolder: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/stakeholder/all-stakeholder",
          method: "GET",
          params: params,
        };
      },
      // providesTags: ["allStakeHolder"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //get single stack holder:
    singleStakeHolder: builder.query({
      query: (slug: string) => ({
        url: `/stakeholder/single-stakeholder/${slug}`,
        method: "GET",
      }),
    }),
    //get stake holder by id:
    getStakeHolderById: builder.query({
      query: (_id: string) => ({
        url: `/stakeholder/single-stakeholder/${_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateStakeHolderMutation,
  useUpdateStackHolderMutation,
  useDeleteStackHolderMutation,
  useAllStakeHolderQuery,
  useSingleStakeHolderQuery,
  useGetStakeHolderByIdQuery,
} = stakeHolderApi;

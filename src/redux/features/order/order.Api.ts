/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allOrders: builder.query({
      query: ({ queryParams = {} }: { queryParams?: Record<string, any> }) => {
        const queryString = new URLSearchParams(queryParams).toString();
        return {
          url: `/order/all-order?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["all-order"],
    }),
    allOrderByKeyWord: builder.query({
      query: ({
        queryParams = {},
        headerParams = {},
      }: {
        queryParams?: Record<string, any>;
        headerParams?: Record<string, any>;
      }) => {
        const queryString = new URLSearchParams(queryParams).toString();
        const headers: Record<string, string> = {};
        if (headerParams?.params) {
          headers["params"] = JSON.stringify(headerParams.params);
        }

        return {
          url: `/order/all-order-by-key-word?${queryString}`,
          method: "GET",
          headers,
        };
      },
      providesTags: ["all-order-by-key-word"],
    }),
    singleOrder: builder.query({
      query: (slug: string) => ({
        url: `/order/single-order/${slug}`,
        method: "GET",
      }),
      providesTags: ["single-order"],
    }),
    orderStatusChange: builder.mutation({
      query: ({ id, orderStatus }) => ({
        url: `/order/change-status/${id}`,
        method: "PATCH",
        body: { orderStatus },
      }),
    }),
  }),
});

export const {
  useAllOrdersQuery,
  useSingleOrderQuery,
  useAllOrderByKeyWordQuery,
  useOrderStatusChangeMutation,
} = orderApi;

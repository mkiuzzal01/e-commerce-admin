import {
  createApi,
  fetchBaseQuery,
  type DefinitionType,
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { logout, setUser, type TUser } from "../features/auth/authSlice";

//this is the  base query:
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

//generate refresh token it's expired:
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    console.log(result.error);
  }
  if (result?.error?.status === 403) {
    console.log(result.error);
  }
  if (result?.error?.status === 401) {


    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const { data } = await res.json();
    const user = (api.getState() as RootState).auth.user as TUser;

    if (data?.result?.accessToken && user) {
      api.dispatch(
        setUser({
          user,
          token: data.result.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});

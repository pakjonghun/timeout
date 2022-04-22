import { MeType, TimeType } from "@libs/server/types";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const USER_MY_STATUS_KEY = "getMeApi";
export const getMeApi = createApi({
  reducerPath: "getMeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getMeStatus: builder.query<MeType, string>({
      query: (query) => `api/users/me?${query}`,
    }),
  }),
});

export const { useGetMeStatusQuery } = getMeApi;

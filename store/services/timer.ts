import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import { TimeType } from "@libs/server/types";

export const USER_TIMER_API_KEY = "timerApi";
export const userTimerApi = createApi({
  reducerPath: "timerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getRecordByDate: builder.query<TimeType, string>({
      query: () => "api/times",
    }),
  }),
});

export const { useGetRecordByDateQuery } = userTimerApi;

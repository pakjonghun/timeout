import { api, Tags } from "./index";
import { tagMaker } from "../../libs/client/utils";
import {
  WorkTimesResponseTimes,
  WorkTimeResponse,
} from "../../libs/server/types/dataTypes";
import {
  StartWorkRequest,
  EndWorkRequest,
} from "../../libs/client/types/dataTypes";
import { Draft } from "@reduxjs/toolkit";
import { endTimer, startTimer } from "@store/reducer/workTime";

type TempTimerDraftType = {
  success: boolean;
  workTimes: {
    id: string | number;
    start: string;
    end: null | string;
    duration: null | number;
  }[];
};

const workTime = api.injectEndpoints({
  endpoints: (build) => ({
    getTimerWorkTimes: build.query<WorkTimeResponse, void>({
      query: () => "worktimes",
      providesTags: (result) =>
        tagMaker<WorkTimesResponseTimes, Tags>(result?.workTimes, "WorkTime"),
    }),
    startWork: build.mutation<WorkTimeResponse, StartWorkRequest>({
      query: (body) => ({
        body,
        method: "POST",
        url: "worktimes",
      }),
      async onQueryStarted({ start }, { dispatch, queryFulfilled }) {
        dispatch(startTimer());
        const patched = dispatch(
          api.util.updateQueryData(
            //@ts-ignore
            "getTimerWorkTimes",
            undefined,
            (draft: Draft<TempTimerDraftType>) => {
              draft.workTimes?.unshift({
                id: (Math.random() * 100000).toString(20).substring(2, 12),
                start,
                end: null,
                duration: null,
              });
            }
          )
        );
        try {
          const {
            data: { workTime },
          } = await queryFulfilled;
          if (workTime) {
            dispatch(
              api.util.updateQueryData(
                //@ts-ignore
                "getTimerWorkTimes",
                undefined,
                (draft: Draft<TempTimerDraftType>) => {
                  draft.workTimes[0].id = workTime.id;
                }
              )
            );
          } else {
            patched.undo();
            dispatch(endTimer());
          }
        } catch {
          patched.undo();
          dispatch(endTimer());
        }
      },
      invalidatesTags: ["MyStatus"],
    }),

    endWork: build.mutation<WorkTimeResponse, EndWorkRequest>({
      query: (body) => ({
        body,
        method: "POST",
        url: "worktimes",
      }),
      async onQueryStarted({ end, duration }, { dispatch, queryFulfilled }) {
        dispatch(endTimer());
        const patched = dispatch(
          api.util.updateQueryData(
            //@ts-ignore
            "getTimerWorkTimes",
            undefined,
            (draft: Draft<TempTimerDraftType>) => {
              if (draft.workTimes.length) {
                draft.workTimes[0].end = end;
                draft.workTimes[0].duration = duration;
              }
            }
          )
        );
        try {
          const {
            data: { success },
          } = await queryFulfilled;

          if (!success) {
            patched.undo();
            dispatch(startTimer());
          }
        } catch {
          patched.undo();
          dispatch(startTimer());
        }
      },
      invalidatesTags: ["MyStatus"],
    }),
  }),
});

export const {
  useGetTimerWorkTimesQuery,
  useStartWorkMutation,
  useEndWorkMutation,
} = workTime;

import { AdminRecordHeaderType } from "./../../libs/client/types/dataTypes";
import { SortType } from "@libs/server/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const thead: AdminRecordHeaderType = {
  ["#"]: { colSpan: 1 },
  name: { sort: null, colSpan: 2 },
  start: { sort: null, colSpan: 2 },
  end: { sort: null, colSpan: 2 },
  duration: { sort: null, colSpan: 2 },
};

type AdminRecordStateType = {
  thead: AdminRecordHeaderType;
  selectedIds: number[];
  isAllSelected: boolean;
  currentSort: keyof AdminRecordHeaderType | null;
};

const initialState: AdminRecordStateType = {
  thead,
  selectedIds: [],
  isAllSelected: false,
  currentSort: null,
};

type SortPayloadType = {
  title: keyof AdminRecordHeaderType;
  sort: SortType;
};

const adminRecordSlice = createSlice({
  name: "adminRecord",
  initialState,
  reducers: {
    sort: (state, { payload }: PayloadAction<SortPayloadType>) => {
      const { title, sort } = payload;
      state.thead[title].sort = sort;

      if (state.currentSort && state.currentSort !== title) {
        state.thead[state.currentSort].sort = null;
      }

      state.currentSort = title;
    },
    addItem: (state, { payload }: PayloadAction<number>) => {
      state.selectedIds.push(payload);
    },
    removeItem: (state, { payload }: PayloadAction<number>) => {
      state.selectedIds = state.selectedIds.filter((id) => id !== payload);
    },
    selectAll: (state, { payload }: PayloadAction<number[]>) => {
      state.isAllSelected = true;
      state.selectedIds = payload;
    },
    clearAll: (state) => {
      state.isAllSelected = false;
      state.selectedIds = [];
    },
  },
});

export const { sort, addItem, removeItem, selectAll, clearAll } =
  adminRecordSlice.actions;

export default adminRecordSlice.reducer;
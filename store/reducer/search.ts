import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SearchState = {
  keyWord: string | null;
  startDate: string | null;
  endDate: string | null;
  dates: string[];
  isShowFilter: boolean;
};

const initialState: SearchState = {
  dates: [],
  isShowFilter: false,
  keyWord: null,
  startDate: null,
  endDate: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setKeyWord: (state, { payload }: PayloadAction<string>) => {
      state.keyWord = payload;
    },
    setDates: (state, { payload }: PayloadAction<string>) => {
      state.dates.push(payload);
    },
    setStartDate: (state, { payload }: PayloadAction<string>) => {
      state.startDate = payload;
    },
    setEndDate: (state, { payload }: PayloadAction<string>) => {
      state.endDate = payload;
    },
    resetDates: (state) => {
      state.dates = [];
    },
    removeDates: (state, { payload }: PayloadAction<string>) => {
      state.dates = state.dates.filter((date) => date !== payload);
    },
    resetDate: (state) => {
      state.startDate = null;
      state.endDate = null;
    },
    showFilter: (state) => {
      state.isShowFilter = true;
    },
    hideFilter: (state) => {
      state.isShowFilter = false;
    },
    toggleFilter: (state) => {
      state.isShowFilter = !state.isShowFilter;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const {
  toggleFilter,
  showFilter,
  hideFilter,
  resetDate,
  setKeyWord,
  setDates,
  setStartDate,
  setEndDate,
  reset,
  removeDates,
  resetDates,
} = searchSlice.actions;
export default searchSlice.reducer;

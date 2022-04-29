import gravatar from "gravatar";
import { Role } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  role: Role | null;
  avatar?: string;
  name?: string;
  isMyStatusLoading: boolean;
};

const initialState: UserState = {
  role: null,
  avatar: `https://${gravatar.url("name", {
    s: "32",
    d: "retro",
  })}`,
  isMyStatusLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRole: (state, { payload }: PayloadAction<Role>) => {
      state.role = payload;
    },
    setAvatar: (state, { payload }: PayloadAction<string>) => {
      state.avatar = payload;
    },
    setMyStatusLoading: (state) => {
      state.isMyStatusLoading = true;
    },
    setMyStatusNotLoading: (state) => {
      state.isMyStatusLoading = false;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});
export const {
  setMyStatusLoading,
  setMyStatusNotLoading,
  reset,
  setRole,
  setAvatar,
} = userSlice.actions;
export default userSlice.reducer;

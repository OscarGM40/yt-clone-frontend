import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../../interfaces/User.types";

export interface userState {
  currentUser: UserModel | null;
  loading: boolean;
  error: boolean;
}

const initialState: userState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Redux Toolkit uses the Immer library(remember Immer)
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<UserModel>) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.error = true;
    },
    logout: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.error = false;
    },
    subscriptions: (state, action: PayloadAction<UserModel>) => {
      if (state.currentUser?.subscribedUsers?.includes(action.payload._id)) {
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex((s) => s === action.payload._id),
          1,
        );
      } else {
        state.currentUser?.subscribedUsers?.push(action.payload._id);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginFailure, loginSuccess, loginStart, logout,subscriptions } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { VideoModel } from "../../interfaces/Video.types";
import { UserModel } from "../../interfaces/User.types";

export interface videoState {
  currentVideo: VideoModel | null;
  loading: boolean;
  error: boolean;
  actualQuery: string;
}

const initialState: videoState = {
  currentVideo: null,
  loading: false,
  error: false,
  actualQuery: "",
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchVideoStart: (state) => {
      state.loading = true;
    },
    fetchVideoSuccess: (state, action: PayloadAction<VideoModel>) => {
      state.loading = false;
      state.currentVideo = action.payload;
      state.error = false;
    },
    fetchVideoFailure: (state) => {
      state.loading = false;
      state.currentVideo = null;
      state.error = true;
    },
    like: (state, action: PayloadAction<UserModel>) => {
      if (!state.currentVideo?.likes.includes(action.payload._id)) {
        state.currentVideo?.likes.push(action.payload._id);
        // fijate como buscamos por indice para el splice(index,1)
        state.currentVideo?.dislikes.splice(
          state.currentVideo.dislikes.findIndex((d) => d === action.payload._id),
          1,
        );
      }
    },
    dislike: (state, action: PayloadAction<UserModel>) => {
      if (!state.currentVideo?.dislikes.includes(action.payload._id)) {
        state.currentVideo?.dislikes.push(action.payload._id);

        state.currentVideo?.likes.splice(
          state.currentVideo.likes.findIndex((l) => l === action.payload._id),
        );
      }
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.actualQuery = action.payload;
    },
    resetQuery: (state) => {
      state.actualQuery = initialState.actualQuery;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchVideoFailure,
  fetchVideoSuccess,
  fetchVideoStart,
  like,
  dislike,
  setQuery,
  resetQuery,
} = videoSlice.actions;

export default videoSlice.reducer;

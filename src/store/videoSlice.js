import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
  pageNum: "",
  hasNextPage: ""
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    storingVideo(state, action) {
      if (action.payload.isHasNextPage) {
        console.log("not has next page")
      }
      state.videos.push(...action.payload.videos || []);
      state.hasNextPage = action.payload.hasNextPage || false;
    },

    nextPage(state, action) {
      if (action.payload?.init) {
        console.log("init");
        state.pageNum = 1
        return;
      }
      console.log("next page");
      state.pageNum = state.pageNum + 1;
    }
  },
});

export const SelectAllVideoStore = (state) => state.videos; 
// state.videos
// giống tên khai báo trong
// reducer

export const { storingVideo, nextPage } = videoSlice.actions;

export default videoSlice.reducer;

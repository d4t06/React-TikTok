import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    videos: [],
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        storingVideo (state, action) {
            state.videos.push(...action.payload.videos);
        }
    }
})


export const SelectAllVideo = (state) => state.videos

export const {storingVideo} = videoSlice.actions

export default videoSlice.reducer
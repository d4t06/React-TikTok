import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    videos: [],
    isOpenModal: "",
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        storingVideo (state, action) {
            state.videos.push(...action.payload.videos);
        },
        setOpenModal (state, action) {
            state.isOpenModal = action.payload;
        }
    }
})


export const SelectAllVideo = (state) => state.videos

export const {storingVideo, setOpenModal} = videoSlice.actions

export default videoSlice.reducer
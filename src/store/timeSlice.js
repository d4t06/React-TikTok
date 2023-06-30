import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTime: "",
  currentIndex: "",
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setCurrentTime(state, action) {
      state.currentTime = action.payload.time;
    },
    setCurrentIndex(state, action) {
      state.currentIndex = action.payload.index;
    },
  },
});

export const SelectAllTimeStore = (state) => state.time;

export const { setCurrentTime, setCurrentIndex } = timeSlice.actions;

export default timeSlice.reducer;

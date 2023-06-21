import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenModal: "",
  index: "",
  currentTime: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenModal(state, action) {
      state.isOpenModal = action.payload.isOpenModal;
      state.index = action.payload.index || 0;
    },
    setCurrentTime(state, action) {
      state.currentTime = action.payload.time;
    },
  },
});

export const SelectAllModalStore = (state) => state.modal;

export const { setOpenModal, setCurrentTime } = modalSlice.actions;

export default modalSlice.reducer;

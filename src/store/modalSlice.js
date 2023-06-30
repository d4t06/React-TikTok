import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenModal: "",
  index: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenModal(state, action) {
      state.isOpenModal = action.payload.isOpenModal;
      state.index = action.payload.index || 0;
    }
  }
});

export const SelectAllModalStore = (state) => state.modal;

export const { setOpenModal, setCurrentTime } = modalSlice.actions;

export default modalSlice.reducer;

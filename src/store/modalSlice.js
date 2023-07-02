import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenModal: "",
  isMute: false,
  index: "",
  volume: 1,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenModal(state, action) {
      state.isOpenModal = action.payload.isOpenModal;
      state.index = action.payload.index || 0;
    },
    setVolume(state, action) {
      state.volume = action.payload.volume
    },
    setMute(state, action) {
      state.isMute = action.payload.isMute
    }
  }
});

export const SelectAllModalStore = (state) => state.modal;

export const { setOpenModal, setVolume, setMute } = modalSlice.actions;

export default modalSlice.reducer;

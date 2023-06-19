import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./videoSlice";
import modalReducer from "./modalSlice";


const store = configureStore({
    reducer : {
        videos: videoReducer,
        modal: modalReducer,
    }
})

export default store
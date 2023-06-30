import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./videoSlice";
import modalReducer from "./modalSlice";
import timeReducer from "./timeSlice";


const store = configureStore({
    reducer : {
        videos: videoReducer,
        modal: modalReducer,
        time: timeReducer,
    }
})

export default store
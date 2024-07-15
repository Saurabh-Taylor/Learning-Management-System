import { configureStore } from "@reduxjs/toolkit";

import authReducers from "./features/AuthSlice";

const store  = configureStore({
    reducer: {
        auth:authReducers
    },
    devTools:true
})

export default store
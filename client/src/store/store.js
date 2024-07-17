import { configureStore  } from "@reduxjs/toolkit";
import authReducers from "./features/AuthSlice";
import courseReducers from "./features/CourseSlice";


const store  = configureStore({
    reducer: {
        auth:authReducers,
        courses:courseReducers,
    },
    devTools:true
})

export default store
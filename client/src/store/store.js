import { configureStore  } from "@reduxjs/toolkit";
import authReducers from "./features/AuthSlice";
import courseReducers from "./features/CourseSlice";
import razorpayReducers from "./features/RazorpaySlice";


const store  = configureStore({
    reducer: {
        auth:authReducers,
        courses:courseReducers,
        razorpay:razorpayReducers
    },
    devTools:true
})

export default store
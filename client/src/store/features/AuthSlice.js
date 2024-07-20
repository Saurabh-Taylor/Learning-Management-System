import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

let initialState = {
    isLoggedIn:localStorage.getItem("isLoggedIn") || false,
    role:localStorage.getItem("role") || "",
    data: JSON.parse(localStorage.getItem("data")) || {}
}

export const getProfile  = createAsyncThunk("/user/profile" , async()=>{
    const response = await axios.get("http://localhost:3000/api/v1/user/me" , {headers:{
        Authorization:"Bearer "+localStorage.getItem("token")
    }})
    return response?.data
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        logout:(state)=>{
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("role");
            localStorage.removeItem("data");
            state.data = {}
            state.isLoggedIn = false;
            state.role = ""
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getProfile.fulfilled,(state,action)=>{
            localStorage.setItem("data" , JSON.stringify(action.payload.user))
            state.data= action.payload.user
            state.isLoggedIn = true;
            state.role = action.payload.user.role
        })
    }

})

export const  {logout} = authSlice.actions

export default authSlice.reducer
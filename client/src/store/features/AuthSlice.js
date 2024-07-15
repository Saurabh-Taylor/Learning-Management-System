import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    isLoggedIn:localStorage.getItem("isLoggedIn") || false,
    role:localStorage.getItem("role") || "",
    data:localStorage.getItem("data") || {}
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        logout:()=>{
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("role");
            localStorage.removeItem("data");
        }
    }
})

export const  {logout} = authSlice.actions

export default authSlice.reducer
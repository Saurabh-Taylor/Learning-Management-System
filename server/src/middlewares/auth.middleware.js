import jwt from "jsonwebtoken";
import { ApiError } from "../utils/index.js";

const isLoggedIn = (req,res,next)=>{
   try {
     const {token}  = req.cookies
     if(!token){
         return next(new ApiError("Unauthenticated , Please Login Again", 400));
     }
     const userDetails =  jwt.verify(token , process.env.JWT_SECRET)
     req.user = userDetails
     next()
   } catch (error) {
        return next(new ApiError(error.message, 500));
   }
}

export {isLoggedIn}
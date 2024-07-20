import jwt from "jsonwebtoken";
import { ApiError } from "../utils/index.js";

const isLoggedIn = (req,res,next)=>{
   try {
    let token 
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check for token in cookies if not found in authorization header
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
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




export const adminMiddleware = async (req,res,next)=>{
  try {
      if(req.user.role === "ADMIN"){
        next()
      }else{
        return next(new ApiError("You are not authorized to access this route", 403));
      }
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
}

export {isLoggedIn}
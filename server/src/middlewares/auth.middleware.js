import jwt from "jsonwebtoken";
import { ApiError } from "../utils/index.js";

const isLoggedIn = (req,res,next)=>{
    const {token}  = req.cookies
    if(!token){
        return next(new ApiError("Unauthenticated , Please Login Again", 400));
    }
    const userDetails =  jwt.verify(token , process.env.JWT_SECRET)
    req.user = userDetails
    next()
}

export {isLoggedIn}
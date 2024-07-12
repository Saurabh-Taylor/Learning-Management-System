import express from "express";
import { register, login, logout, getProfile,  forgetPassword, resetPassword , changePassword, updateProfile } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";



const router = express.Router()


router.post("/register" , upload.single("avatar") , register)
router.post("/login" , login)
router.get("/logout" , isLoggedIn ,  logout)
router.get("/me" ,isLoggedIn ,  getProfile)
router.post("/forget-password" , forgetPassword)
router.post("/reset-password/:token" , resetPassword)
router.post("/change-password/" ,isLoggedIn , changePassword)
router.put("/update" , isLoggedIn , upload.single("avatar") , updateProfile)

export default router
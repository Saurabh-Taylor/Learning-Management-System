import express from "express";
import { getAllCourses , getCourseById , createCourse ,deleteCourse ,updateCourse , addLecturesByCourseId } from "../controllers/course.controller.js";
import {  isLoggedIn , adminMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";



const router = express.Router()


router.route("/" )
    .get(getAllCourses)
    .post(isLoggedIn,  adminMiddleware, upload.single("thumbnail") ,  createCourse)
    
router.route("/:id")
    .get(isLoggedIn, adminMiddleware,  getCourseById)
    .put(isLoggedIn,  adminMiddleware, updateCourse)
    .delete(isLoggedIn ,  adminMiddleware, deleteCourse)
    .post(isLoggedIn , adminMiddleware , upload.single("thumbnail"), addLecturesByCourseId)

export default router
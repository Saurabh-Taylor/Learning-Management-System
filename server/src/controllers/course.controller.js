import Course from "../models/course.model.js";
import { ApiError } from "../utils/index.js";
import fs from "fs";

import cloudinary from "cloudinary";

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).select("-lectures");
    return res.status(200).json({
      success: true,
      message: "All Courses",
      courses,
    });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const {id} =req.params
    const course = await Course.findById(id)
    if(!course){
        return next(new ApiError("Course not found",404))
    }

    return res.status(200).json({
        success: true,
        message: "Course Lectures fetched Successfully",
        lectures:course.lectures,
    })

  } catch (error){
    return next(new ApiError(error.message, 500));
  }
};

const createCourse = async(req,res,next)=>{
    try {
        const { title , description , category   } = req.body
        const {id  } = req.user

        if(!title , !description , !category ){
            return next(new ApiError("Please fill all the fields",400))
        }


        const course = await Course.create({title,description,category,createdBy:id})
        if(!course){
            return next(new ApiError("Course not created , please try again",500))
        }


        //file
        if (req.file) {
            try {
              const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "courses",
                width: 250,
                height: 250,
                gravity: "faces",
                crop: "fill",
              });
              if (result) {
                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;
                //now we have to remove the file from local server as well
                fs.unlinkSync(req.file.path);
              }
            } catch (error) {
              return next(new ApiError(error.message, 500));
            }
          }
        await course.save()

        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            course
        })

    } catch (error) {
        return next(new ApiError(error.message,500))
    }
}

const updateCourse = async(req,res,next)=>{
    try {
        const {id} = req.params
        const course = await Course.findByIdAndUpdate(id , req.body , {runValidators:true} )
        if(!course){
            return next(new ApiError("Course not found with the given id",404))
        }
        res.status(200).json({
            success:true,
            message:"Course updated successfully",
            course
        })
    } catch (error) {
        
    }
}

const deleteCourse = async(req,res,next)=>{
    try {
        const {id} = req.params
        if(!id){
            return next(new ApiError("give an id for the course u want to delete",404))
        }
        const course = await Course.findByIdAndDelete(id)
        if(!course){
            return next(new ApiError("Course not found with the given id",404))
        }

        return res.status(200).json({
            success:true,
            message:"Course deleted successfully",
        })

    } catch (error) {
      return next(new ApiError(error.message,500))
    }
}

const addLecturesByCourseId = async(req,res,next)=>{
  try {
    const {title , description} = req.body
    const {id} = req.params
    if(!title , !description){
      return next(new ApiError("give a title and description for the lecture",404))
    }
    if(!id){
      return next(new ApiError("give an id for the course u want to add lecture to",404))
    }
    const course = await Course.findById(id)
    if(!course){
      return next(new ApiError("Course not found with the given id",404))
    }


    const lectureData  = {title , description , lecture:{}}

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lectures",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });
        if (result) {
          lectureData.lecture.public_id = result.public_id;
          lectureData.lecture.secure_url = result.secure_url;
          //now we have to remove the file from local server as well
          fs.unlinkSync(req.file.path);
        }

        course.lectures.push(lectureData)
        course.numbersOfLectures = course.lectures.length
        await course.save()
        res.status(200).json({
          success:true,
          message:"Lecture added successfully",
          course
        })

      } catch (error) {
        return next(new ApiError(error.message, 500));
      }
    }

  } catch (error) {
    
  }
}

export { getAllCourses, getCourseById , createCourse ,updateCourse ,deleteCourse , addLecturesByCourseId };

import { log } from "console";
import { cookieOptions } from "../constants.js";
import { User } from "../models/user.model.js";
import { ApiResponse, ApiError } from "../utils/index.js";
import cloudinary from "cloudinary"
import fs from "fs";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    if (!name || !email || !password) {
      return next(new ApiError("All field are required", 400));
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new ApiError("User Already Exists", 400));
    }

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: email,
        secure_url: "httpss",
      },
    });

    if (!user) {
      return next(new ApiError("User Not Created , Please Try Again", 400));
    }

    // todo file upload
    if(req.file){
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path , {
          folder: "users",
          width:250,
          height:250,
          gravity:"faces",
          crop:"fill"
        })
        if(result){
          console.log(result.public_id);
          user.avatar.public_id = result.public_id
          user.avatar.secure_url = result.secure_url
          //now we have to remove the file from local server as well
          fs.unlinkSync(req.file.path)
          
        }
      } catch (error) {
        return next(new ApiError(error.message, 500));
      }
    }
    await user.save()
    user.password = undefined;
    const token = await user.generateJWTToken();
    res.cookie("token", token, cookieOptions);

    res.json({
      success: true,
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ApiError("All fields are mandatory", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user || !user.comparePassword(password)) {
      return next(
        new ApiError("User doesnt exists or password is invalid", 400)
      );
    }

    const token = user.generateJWTToken();
    user.password = undefined;
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
      user,
    });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};

const logout = async (req, res) => {
  try {
    // res.clearCookie("token");
    res.cookie("token", null , { maxAge: 0, httpOnly: true });
    res.status(200).json({
        success: true,
        message: "User Logged Out Successfully",
    })
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId)
        if(!user){
            return next(new ApiError("User not found", 404))
        }
        res.status(200).json({
            success: true,
            message: "User Profile Fetched Successfully",
            user,
        })
    } catch (error) {
        return next(new ApiError(error.message, 500));
    }
};

export { register, login, logout, getProfile };

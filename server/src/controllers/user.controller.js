import { cookieOptions } from "../constants.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/index.js";
import cloudinary from "cloudinary";
import fs from "fs";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

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
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "users",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });
        if (result) {
          console.log(result.public_id);
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;
          //now we have to remove the file from local server as well
          fs.unlinkSync(req.file.path);
        }
      } catch (error) {
        return next(new ApiError(error.message, 500));
      }
    }
    await user.save();
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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ApiError("All fields are mandatory", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user) {
      return next(new ApiError("User doesnt exists", 400));
    }
    if (!(await user.comparePassword(password))) {
      return next(new ApiError("password is invalid", 400));
    }

    const token = user.generateJWTToken();
    user.password = undefined;
    res.cookie("token", token, cookieOptions);
    return res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
      user,
    });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};

const logout = async (req, res, next) => {
  try {
    // res.clearCookie("token");
    res.cookie("token", null, { maxAge: 0, httpOnly: true });
    res.status(200).json({
      success: true,
      message: "User Logged Out Successfully",
    });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiError("User not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "User Profile Fetched Successfully",
      user,
    });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(new ApiError("Please provide email", 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError("User not found", 404));
    }
    const resetToken = await user.generateRefreshToken();
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const subject = "Reset Password";
    const message = `you can reset password by clicking on <a href=${resetLink} target='_blank' `;

    //sendEmail
    try {
      await sendEmail(email, subject, message);
    } catch (error) {
      user.forgotPasswordToken = undefined;
      user.forgotPasswordExpire = undefined;
      await user.save();
      return next(new ApiError(error.message, 500));
    }

    res.status(200).json({
      success: true,
      message: `Password reset link sent to your ${email}`,
    });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return next(new ApiError("Please provide password", 400));
    }
    const forgotPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const user = await User.findOne({
      forgotPasswordToken,
      forgotPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(new ApiError("Invalid token", 400));
    }
    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpire = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {}
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return next(new ApiError("Please provide old and new password", 400));
    }
    const user = await User.findById(req.user.id).select("+password");
    if (!isMatch) {
      return next(new ApiError("Old password is incorrect", 400));
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

const updateProfile = async (req, res, next) => {
  const id = req.user.id;
  try {
    const { name } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return next(new ApiError("User not found", 400));
    }

    if (name) {
      user.name = name;
    }
    if (req.file) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id)
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "users",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });
        if (result) {
          console.log(result.public_id);
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;
          //now we have to remove the file from local server as well
          fs.unlinkSync(req.file.path);
        }
      } catch (error) {
        return next(new ApiError(error.message, 500));
      }
    }
    await user.save();
    return res.status(200).json({
      success: true,
      message: "User Details updated successfully",
    });

  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

export {
  register,
  login,
  logout,
  getProfile,
  forgetPassword,
  resetPassword,
  changePassword,
  updateProfile,
};

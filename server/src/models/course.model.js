import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true , "Title is required"],
        trim:true,
        minlength:[8 , "Title must be less than 8 characters"],
        maxlength:[100 , "Title must be less than 100 characters"],

    },
    description:{
        type:String,
        required:[true , "Description is required"],
        trim:true,

    },
    category:{
        type:String,
        required:[true , "Category is required"],
    },
    thumbnail:{
        public_id:{
            type:String,
        },
        secure_url:{
            type:String,
        }
    },
    lectures:[
        {
            title:String,
            description:String,
            lecture:{
                public_id:{
                    type:String,
                    required:true
                },
                secure_url:{
                    type:String,
                    required:true
                }
            }
        },
    ],
    numbersOfLectures:{
        type:Number,
        default:0
    },
    createdBy:{
        type:String,
        ref:"User"
    }
} , {timestamps:true})


const Course = mongoose.model("Course" , courseSchema)

export default Course
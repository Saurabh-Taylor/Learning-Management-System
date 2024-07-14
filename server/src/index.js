import app from "./app.js";
import { connectToDB } from "./config/dbConnect.js";
import { v2 as cloudinary } from 'cloudinary';
import Razorpay from "razorpay";

const PORT =  process.env.PORT || 5000

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
})


app.listen(PORT , async()=>{
    await connectToDB()
    console.log(`Server running on port ${PORT}`)
})
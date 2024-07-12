import app from "./app.js";
import { connectToDB } from "./config/dbConnect.js";
import { v2 as cloudinary } from 'cloudinary';

const PORT =  process.env.PORT || 5000

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});


app.listen(PORT , async()=>{
    await connectToDB()
    console.log(`Server running on port ${PORT}`)
})
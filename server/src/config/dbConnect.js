import mongoose from "mongoose";

mongoose.set("strictQuery" , false)

export const connectToDB = async ()=>{
    try {
        const db = await mongoose.connect(String(process.env.MONGO_URI))
        console.log("DB connected" + db.connection.host)

    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}
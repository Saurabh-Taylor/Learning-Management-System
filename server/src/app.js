import express from "express";
import dotenv from "dotenv";
dotenv.config()
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";


const app = express()

//built-in middlewares
app.use(express.json())
app.use(cors({
    origin:[String(process.env.FRONTEND_URL)],
    credentials:true 
    //This allows the server to accept credentials (like cookies, authorization headers, or TLS client certificates) from the specified origin.
}))
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

//routes
app.get("/" , (req,res)=>{
    res.send("Healthy server")
})


//custom Routes
import userRoutes  from "./routes/user.routes.js";
app.use("/api/v1/user" , userRoutes)



app.all("*"  , (req,res)=>{
    res.status(404).send("Page not found")
})


//error
import errorMiddleware  from "./middlewares/error.middleware.js";
app.use(errorMiddleware)


export default app



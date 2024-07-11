import app from "./app.js";
import { connectToDB } from "./config/dbConnect.js";

const PORT =  process.env.PORT || 5000

app.listen(PORT , async()=>{
    await connectToDB()
    console.log(`Server running on port ${PORT}`)
})
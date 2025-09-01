import mongoose from "mongoose"
import config from "../config/config.js"

const connectDB=async()=>{
    try {
        await mongoose.connect(config.DB_URI || "mongodb://127.0.0.1:27017/pingstatus")
        console.log("Conectado DB")
    } catch (error) {
        console.log(error);
    }
}

export default connectDB
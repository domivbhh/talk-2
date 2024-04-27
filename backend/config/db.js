// import mongoose from "mongoose";
const mongoose=require('mongoose')
const dotenv = require("dotenv");
dotenv.config();




const connectDb=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log(`MONGODB connected:${conn.connection.host}`.cyan.underline)
    }
    catch(err){
        console.log("error from mongodb connection",err.message.red.bold)
        process.exit()

    }
}

module.exports=connectDb
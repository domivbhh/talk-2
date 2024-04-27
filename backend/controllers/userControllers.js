// const expressAsyncHandler = require("express-async-handler")
const User=require('../models/userModel.js')
const generateToken=require('../config/generateToken.js')
const bcryptjs=require('bcryptjs')
const asyncHandler = require("express-async-handler");
const { use } = require('../routes/userRoutes.js');

const registerUser=asyncHandler(async(req,res)=>{
    const{name,email,password,pic}=req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter the Fields")
    }

    const userExists=await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error("User Already exists")
    }

    const hashedPassword=await bcryptjs.hash(password,12)
    const user=await User.create({
        name,email,password:hashedPassword,pic
    })

    if(user){
        res.status(201).json({_id:user._id,name:user.name,email:user.email,pic:user.pic,token:generateToken(user._id)})
    }
    else{
        res.status(400)
        throw new Error('failed to create the user');
    }

})


const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email})
    const verifyPassword=bcryptjs.compareSync(password,user.password)
    if(user && verifyPassword){
        res.json({_id:user._id,name:user.name,email:user.email,pic:user.pic,token:generateToken(user._id)})
    }
    else{
        {
        res.status(400)
        throw new Error('failed to create the user');
    }
    }



})

module.exports={registerUser,authUser}
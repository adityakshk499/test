import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"




export const loginUser = async(req,res)  =>{
  const {email,password}=req.body;
  try{
  const user = await userModel.findOne({email});
  if(!user){
    res.json({success:false,message:"user Doesn't exist"})
  }
  const isMatch = await bcrypt.compare(password,user.password);
  if(!isMatch){
    return res.json({success:false,message:"Invalid Credential"})
  }
  const token = createdToken(user._id)
  res.json({success:true,token})
  }catch(error){
    res.json({success:false,message:"error"})
  }

}

const createdToken = (id)=>{
return jwt.sign({id},process.env.JWT_SECRET_KEY)
}

export const registerUser = async(req,res) =>{

  const {name,password,email}=req.body;
  try{
    //checking user exists
    const exist = await userModel.findOne({email});
    if(exist){
      return res.json({success:false,message:"User Already Exist"})
    }
    //validation email format and strong password
    if(!validator.isEmail(email)){
      return res.json({success:false,message:"Please Enter a Valid Email"}) 
    }
    if(password.length<8){
      res.json({success:false,message:"Please Enter a Strong Password"})
    }
    //hashing password using bcrypt
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = new userModel({
      name:name,
      email:email,
      password:hashedPassword
    })

   const user = await newUser.save();
   const token = createdToken(user._id)
   res.json({success:true,token})

  }catch(error){
    res.json({success:false,message:"error"})
  }
}
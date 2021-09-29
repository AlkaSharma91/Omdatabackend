import { validationResult } from "express-validator";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


export const registerUser = async(req,res) =>{
     console.log('register user called')

     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       console.log(errors);
       return res.status(400).json({ 
           status:400,
           message:"server validation error",
           errors: errors.array() });
     }

    const { name, email, address, phone, password } = await req.body; 
    const userExists = await User.findOne({ email });
    if(userExists){
        console.log("user already exists");
        return res.status(403).json({
            status:403,
            message:"user already exists",  
        })
    }else{
        const  user =await User.create({name,email,address,phone,password})

        if(user){
            console.log("user created successfully");
            return res.status(201).json({
                status:201,
                message:"user created successfully"
            })
        }else{
            return res.status(500).json({
                status:500,
                message:'user not created due to internal server error'
            })
        }
    }
}

export const loginUser = async(req,res) =>{
    console.log("login user called");
    const {email,password}=req.body;
    const user = await User.findOne({ email });
    const isAuth = (await user?.password) == password;
    if(user && isAuth){
        const token=generateToken(user._id)
        console.log("user logged in successfully")
        res.status(200).json({
            status:200,
            message:"user logged in successfully",
            token,
    })}else{
        res.status(404).json({
            status:404,
            message:"user not found"
            
        })

    }

}

export const getUserProfile = async(req,res)=>{

   
    const user=await User.findById(req.user._id)
    if(user){
        console.log("get user profile successfully")
        res.status(200).json({
            id:user._id,
            name:user.name,
            email:user.email,
            address:user.address,
            phone:user.phone,
            password:user.password

        })
    }else{
        res.status(404).json({
            status:404,
            message:"user not found"
            
        })

    }

  
}
export const updateUser = async(req,res) =>{

    console.log("request came");
    //console.log("req with protect",req.user?);
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    console.log("user is", user);
  
    if (user) {
      const { modifiedCount } = await User.updateOne({ _id: id }, req.body);
      if (modifiedCount == 1) {
        const user = await User.findOne({ _id: id });
        if (user) {
            console.log("user updated successfull")
          res.json(user);
        }
      }
    }


  }

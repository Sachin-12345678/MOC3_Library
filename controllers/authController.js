const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/user");

const registerUser = async (req,res)=>{
    try {
        const {name,email,password,isAdmin}=req.body;

        let user=await User.findOne({email});
        if(user)
        {
            return res.send.status(400).json({message: "User allready exists"});
        }

        const hashedPassaword= await bcrypt.hash(password, 10);

        user=new User({
            name,
            email,
            password: hashedPassaword,
            isAdmin,
        });

        await user.save();
        res.status(201).json({message: "User registered successfully"})
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({message: "Server error"});
    }
};

const loginUser = async (req,res)=>{
    try {
        const {email,password}=req.body;

        const user=await User.findOne({email});
        if(!user)
        {
            return res.send.status(400).json({message: "Invalid Credentials"});
        }

        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch)
        {
            return res.send.status(400).json({message: "Invalid Credentials"});
        }

        const token=jwt.sign({userId: user._id}, "masai", {expiresIn: "1h"});
        res.status(200).json({token});

    } catch (error) {
        console.log("Error comming in user:", error);
        res.status(500).json({message: "Server error"});
    }
};

module.exports={
    registerUser,
    loginUser
}
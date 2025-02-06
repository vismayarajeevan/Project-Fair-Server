// controller for all user related logics

// 2.import model
const users = require('../models/userModel')

// 5.import jwt
const jwt = require('jsonwebtoken')

// *********************1.Register********************************
exports.registerController = async (req,res)=>{
    console.log("Inside register controller");
    console.log(req.body);
    // 3. destructure the values inside usermodal
    const{username,email,password} =req.body

    // 4.define logic
    try {

        // a. check existing user or not using email
        const existingUser = await users.findOne({email})
        if(existingUser){
            
            // if already exist pass the message using status code. Json to pass data
            res.status(406).json('Already existing user.. Please login!!!')
        }else{
            // 
            const newUser = new users({
                username,email,password,github:'',linkedin:'',profilePic:''
            })
            // save the data
            await newUser.save()
            // pass the data
            res.status(200).json(newUser)
        }
        
    } catch (error) {
        res.status(401).json(error)
    }
    
    
}

// *********************2.login********************************
exports.loginController = async(req,res)=>{
    console.log("Inside login controller");
    const {email,password} = req.body
    console.log(email,password);

    try {
        const existingUser = await users.findOne({email,password})
        if(existingUser){
             // token generation
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({
                user:existingUser,token
            })
        }else{
            res.status(404).json("Incorrect Email/password")
        }
    } catch (error) {
        res.status(401).json(err)
    }
    
    
}

// *********************3.Profile edit********************************

exports.editUserController = async(req,res)=>{
    console.log("editUserController");

    // get all keys
    const{username,email,password,github,linkedin,profilePic} = req.body
    // handle upload profile image
    const uploadProfilePic = req.file?req.file.filename :profilePic

    // id of user from middleware
    const userId = req.userId
    try {
        const updateUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profilePic:uploadProfilePic
        },{new:true})
        // save in mongodb
        await updateUser.save()
        // send response to frontend
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

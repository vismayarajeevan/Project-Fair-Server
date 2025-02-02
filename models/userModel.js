const mongoose = require('mongoose')

// 1. create an object for schema class
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    },
    profilePic:{
        type:String
    }
})

// 2. create model
const users = mongoose.model("users",userSchema)

// 3.export model
module.exports =users
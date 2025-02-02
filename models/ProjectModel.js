const mongoose = require('mongoose')

// schema for add project
const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    languages:{
        type:String,
        required:true
    },
    overview:{
        type:String,
        required:true
    },
    github:{
        type:String,
        required:true,
        unique:true
    },
    website:{
        type:String,
        required:true
    },
    projectImg:{
        type:String,
        required:true
    },

    // need user id to identify it is logined user or not
    userId:{
        type:String,
        required:true
    } 
})

// create model for this schema
const projects = mongoose.model("projects",projectSchema)

// export model
module.exports = projects
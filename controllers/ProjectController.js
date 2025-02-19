const projects = require('../models/ProjectModel')

// add projects
exports.addProjectController = async(req,res) =>{
    console.log("Inside addProjectController");
    const userId = req.userId
    console.log(userId);
    // use destructure to take all keys in projects body
    const {title,languages,overview,github,website} = req.body

    // project image take from multer and need only filename so take it from file
    const projectImg = req.file.filename
    // console.log(req.body);
    console.log(title,languages,overview,github,website,projectImg);
    
    
    try {
        // check the project is already exists or not by using findone. Here unique value is git hub
        const existingProjects = await projects.findOne({github})

        if(existingProjects){
            res.status(406).json("Project already exist in our collection...Please upload another one...")

        }else{
            // create an object for modal and also use userid
            const newProject = new projects({
                title,languages,overview,github,website,projectImg,userId
            })
            // save the object
            await newProject.save()
            res.status(200).json(newProject)
        }

        
    } catch (error) {
        res.status(401).json(err)
    }
    
}


// get homeprojects - no need of auhorization
exports.homePageProjectController = async(req,res) =>{
    console.log("Inside homePageProjectController");
    
    
    try {
        // get the projects using find and limit the count to 3, to get only 3 projects. 
        const allHomeProjects = await projects.find().limit(3)
        res.status(200).json(allHomeProjects)
        
    } catch (error) {
        res.status(401).json(error)
    }
    
}

// get all projects - need auhorization
exports.allProjectController = async(req,res) =>{

    const searchKey = req.query.search
    console.log(searchKey);

    const query ={
        languages:{
            $regex:searchKey,$options:'i'
        }
    }
    

    console.log("Inside allProjectController");
    
    
    try {
        // get the projects using find  
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
        
    } catch (error) {
        res.status(401).json(error)
    }
    
}

// get user projects - need auhorization
exports.userProjectController = async(req,res) =>{

    console.log("Inside userProjectController");
    const userId = req.userId
    
    
    try {
        // get the projects using find  
        const alluserProjects = await projects.find({userId})
        res.status(200).json(alluserProjects)
        
    } catch (error) {
        res.status(401).json(error)
    }
    
}

// edit projects - need auhorization
exports.editProjectController = async(req,res) =>{

    console.log("Inside editProjectController");
    
    // fetch project id
    const id = req.params.id
    // take user id
    const userId = req.userId
    // take all project details using destrcturing
    const {title,languages,overview,github,website,projectImg} = req.body

    // check image is uploaded or not
    const reUploadProjectImg = req.file?req.file.filename:projectImg
    
    // added to mongodb
    try {
        // get the projects details findByIdAndUpdate
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,languages,overview,github,website,projectImg:reUploadProjectImg,userId},{new:true}) 
        // save to mongodb
        await updateProject.save()
        res.status(200).json(updateProject)
      
        
    } catch (error) {
        res.status(401).json(error)
    }
    
}

// delete projects -need authorization
exports.removeProjectController = async(req,res)=>{
    console.log("Inside removeProjectController");

    const {id} = req.params

    try {
        const deleteProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(deleteProject)
    } catch (error) {
        res.status(401).json(error)
    }
    
}
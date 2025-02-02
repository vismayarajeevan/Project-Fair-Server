const multer = require('multer')

// storage for multer
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        // to make unique use date and time of upload img and get its original name use file.originalname
        callback(null,`image-${Date.now()}-${file.originalname}`)
    }
})

// create an instance for storage
const multerMiddleware = multer({
    storage
})

// export
module.exports = multerMiddleware
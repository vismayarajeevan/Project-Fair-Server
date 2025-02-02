// authetication done using token . so import jwt token
const jwt = require('jsonwebtoken')

// create middleware
const jwtMiddleware = (req,res,next)=>{
    console.log("Inside middleware");

    // get token from header in req and take only token remove bearer.
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);

    if(token !=''){
       try {
        
         // verify token
         const jwtResponse = jwt.verify(token,process.env.JWTPASSWORD)
         console.log(jwtResponse);
         // take the userId from jwtresponse and assign to req userId
         req.userId = jwtResponse.userId
         
       } catch (error) {
        res.status(401).json("Authorization failed..Please login...")
        
        
       }
        

    }else{
        res.status(404).json("Authorization failed.. Token is Missing...!!!")
    }
    
    next()
    
}

// export middleware
module.exports = jwtMiddleware
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("inside jswt middleware")
    
    const token = req.headers.authorization.split(" ")[1]
    // console.log(token)

    try{
        const jwtResponse = jwt.verify(token,process.env.JWTSECRET)
        console.log(jwtResponse)
        req.payload = jwtResponse.userMail
        next()
    }catch(err){
        res.status(401).json("Invalid token",err)
    }

   
}

module.exports = jwtMiddleware 
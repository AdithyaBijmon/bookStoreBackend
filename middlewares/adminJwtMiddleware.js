const jwt = require('jsonwebtoken')

const adminJwtMiddleware = (req, res, next) => {
    console.log("Inside admin middleware")
    let token = req.headers.authorization.split(" ")[1]
    token = token.trim().replace(/"/g, '')
    // console.log(token);

    try {
        const jwtResponse = jwt.verify(token, process.env.JWTSECRET)
        req.payload = jwtResponse.userMail
        req.role = jwtResponse.role
        if(jwtResponse.role=="admin"){
            next()
        }
        else{
            res.status(401).json("Unauthorized user!")
        }
 
    }
    catch (err) {
        res.status(401).json("Invalid token",err)
    }


}

module.exports = adminJwtMiddleware
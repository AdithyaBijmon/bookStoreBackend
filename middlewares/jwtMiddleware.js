const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    console.log("inside jwt middleware")

    let token = req.headers.authorization.split(" ")[1] 
    token = token.trim().replace(/"/g, '') 

    try {
        
        const jwtResponse = jwt.verify(token, process.env.JWTSECRET)
        req.payload = jwtResponse.userMail
        next()
    } catch (err) {
       console.log("Invalid token",err)
    }
}

module.exports = jwtMiddleware
const users = require("../models/userModel")
const jwt = require('jsonwebtoken')


// ----------------------user-------------------------

exports.registerController = async (req, res) => {

    console.log('Inside register api')
    //   console.log(req.body)
    const { username, email, password } = req.body
    // console.log(username, email, password)
    try {
        const existingUser = await users.findOne({ email })

        if (existingUser) {
            res.status(409).json("User already exists. Please Login")
        }
        else {

            const newUser = new users({
                username,
                email,
                password
            })

            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        res.status(500).json(err)
    }


}

exports.loginController = async (req, res) => {

    console.log('Inside login api')
    //   console.log(req.body)
    const { email, password } = req.body
    console.log(email, password)
    try {
        const existingUser = await users.findOne({ email })

        if (existingUser) {
            if (existingUser.password == password) {
                // token
                const token = jwt.sign({ userMail: existingUser.email,role:existingUser.role }, process.env.JWTSECRET)
                res.status(200).json({ user: existingUser, token })
            }
            else {
                res.status(401).json("Invalid email or password")
            }

        }
        else {

            res.status(404).json("Account does not exist!")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }


}

exports.googleLoginController = async (req, res) => {

    console.log('Inside google login api')
    //   console.log(req.body)
    const { email, password, username, profile } = req.body
    console.log(email, password, username, profile)
    try {
        const existingUser = await users.findOne({ email })

        if (existingUser) {

            // token
            const token = jwt.sign({ userMail: existingUser.email,role:existingUser.role }, process.env.JWTSECRET)
            res.status(200).json({ user: existingUser, token })

        } else {
            const newUser = new users({
                email, password, username, profile
            })

            await newUser.save()

            const token = jwt.sign({ userMail: newUser.email }, process.env.JWTSECRET)
            res.status(200).json({ user: newUser, token })
        }
    }

    catch (err) {
        res.status(500).json(err)
    }


}


exports.updateUserProfile = async (req, res) => {
    console.log("Inside profile edit")
    const { username, password, bio, role, profile } = req.body
    const email = req.payload
    const uploadProfile = req.file ? req.file.filename : profile

    try {
        const updateUser = await users.findOneAndUpdate({ email }, { username, password, profile: uploadProfile, bio, role }, { new: true })
        await updateUser.save()
        res.status(200).json(updateUser)

    } catch (err) {
        res.status(500).json("Something went wrong")
    }

}

// --------------------Admin-------------------
exports.getAllUsers = async (req, res) => {
    console.log("Inside get all users")
    const email = req.payload
    try {
        const allUsers = await users.find({email:{$ne:email}})
        res.status(200).json(allUsers)

    }
    catch (err) {
       res.status(500).json(err)

    }
}

exports.updateAdminProfile = async (req,res)=>{
    console.log("Inside admin profile update")
    const {username,password,bio,role,profile} = req.body
    const email = req.payload
    const uploadProfile = req.file?req.filename:profile
    try{
        const updateAdmin = await users.findOneAndUpdate({email},{username,email,password,profile:uploadProfile,bio,role},{new:true})
        await updateAdmin.save()
        res.status(200).json(updateAdmin)

    }
    catch(err){
        res.status(500).json(err)
    }
}





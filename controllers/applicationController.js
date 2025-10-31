const applications = require('../models/applicationModel')


// add application
exports.addApplication = async (req,res)=>{
    console.log("Inside add application")
    const {fullName,email,qualification,phone,coverLetter,jobTitle,jobId} = req.body
    const resume = req.file.filename

    try{
        const applicationDetails = await applications.findOne({email,jobId})
        if(applicationDetails){
            res.status(409).json("You already applied this job.")
        }
        else{
            const newApplication = new applications({
                fullName,email,qualification,phone,coverLetter,resume,jobTitle,jobId
            })
            await newApplication.save()
            res.status(200).json(newApplication)
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}


// get application
exports.getApplications = async (req,res)=>{
    console.log("Inside get applications");
    try{
        const allApplications = await applications.find()
        res.status(200).json(allApplications)

    }
    catch(err){
        res.status(500).json(err)
    }
}

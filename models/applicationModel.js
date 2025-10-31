const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    qualification:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    coverLetter:{
        type:String,
        require:true
    },
    resume:{
        type:String,
        require:true
    },
    jobTitle:{
        type:String,
        require:true
    },
    jobId:{
        type:String,
        require:true
    },

})

const applications = mongoose.model("applications",applicationSchema)
module.exports = applications
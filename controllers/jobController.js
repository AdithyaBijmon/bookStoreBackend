const jobs = require('../models/jobModel')

// add job
exports.addJobController = async (req, res) => {
    console.log("Inside add job")
    const { title, location, jobType, salary, qualification, experience, description } = req.body

    try {
        const jobDetails = await jobs.findOne({ title, location })
        if (jobDetails) {
            res.status(409).json("Job already added.")
        }
        else {
            const newJob = new jobs({
                title,
                location,
                jobType,
                salary,
                qualification,
                experience,
                description
            })
            await newJob.save()
            res.status(200).json(newJob)
        }

    }
    catch (err) {
        res.status(500).json(err)
    }
}

// get all jobs
exports.getAllJobsController = async (req, res) => {
    console.log("Inside get all jobs")
    const searchKey = req.query.search
    const query = {
        title: { $regex: searchKey, $options: 'i' }
    }

    try {
        const allJobs = await jobs.find(query)
        res.status(200).json(allJobs)

    } catch (err) {
        res.status(500).json(err)
    }
}

// delete job - 6902e415ffcc4ad5c1df31dd
exports.removeJobController = async (req,res)=>{
    console.log("Inside remove job")
    const {id} = req.params
    try{
        const removeJob = await jobs.findByIdAndDelete({_id:id})
        res.status(200).json(removeJob)

    }catch(err){
        res.status(500).json(err)
    }
}
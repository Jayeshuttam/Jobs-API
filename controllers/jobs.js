const res = require("express/lib/response")


const getAllJobs = async (req,res) =>{
    res.send('gett All jobs')
}
const getJob = async (req,res) =>{
    res.send('Get single job')
}
const createJob = async (req,res) =>{
    res.send('Create single job')
}
const updateJob = async (req,res) =>{
    res.send('update single job')
}
const deleteJob = async (req,res) =>{
    res.send('delete single job')
}

module.exports ={getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob}
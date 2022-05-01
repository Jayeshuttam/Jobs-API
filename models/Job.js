const { default: mongoose } = require("mongoose");
const JobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'Please provide Company name'],
        maxlength:50,
    },
    position:{
        type:String,
        required:[true,'Please provide Position name'],
        maxlength:100,
    },
    status:{
        type:String,
        enum:['interview','decline','pending'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide a User']
    }
},{timestamps:true})

module.exports=mongoose.model('Job',JobSchema)
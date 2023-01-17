const mongoose=require('mongoose');
const {Schema}=mongoose;

const JobseekerSchema=new Schema({
    // user :{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'users'
    // },
    email :{
        type: String,
        required: true
    },
    firstName :{
        type: String,
        required: true
    },
    lastName :{
        type: String,
        required: true
    },
    bio :{
        type: String,
        required: true
    },
    contact :{
        type: String,
        required: true
    },
    collage :{
        type: String,
        required: true
    },
    degree :{
        type: String,
        required: true
    },
    skills :{
        type: String,
        required: true
    },
    experience :{
        type: Number,
        required: true
    },
    language :{
        type: String,
        required: true
    },
    englishlevel :{
        type: String,
        required: true
    },
    city :{
        type: String,
        required: true
    },
    state :{
        type: String,
        required: true
    },
    resume :{
        type: String,
        required: true
    },
    profileimage : String,
})
const JobSeeker=mongoose.model('jobseeker',JobseekerSchema);
module.exports=JobSeeker;
const mongoose=require('mongoose');
const {Schema}=mongoose;

const JobproviderSchema=new Schema({
    email :{
        type: String,
        required: true,
        unique:true
    },
    cname :{
        type: String,
        required: true
    },
    contact :{
        type: String,
        required: true,
    },
    address :{
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
    type:{
        type:String,
        required: true
    },
    description :{
        type:String,
        required: false
    },
    logo:{
        type:String,
        required:false
    },
    website:{
        type:String,
        required:false
    },
    instagram:{
        type:String,
        required:false
    },
    facebook:{
        type:String,
        required:false
    },
})
const Jobprovider=mongoose.model('jobprovider',JobproviderSchema);
// User.createIndexes();
module.exports=Jobprovider;

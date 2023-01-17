const mongoose=require('mongoose');
const {Schema}=mongoose;

const JobSchema=new Schema({
    postedby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobprovider'
    },
    cname:{
        type: mongoose.Schema.Types.String,
        ref: 'jobprovider'
    },
    city:{
        type: mongoose.Schema.Types.String,
        ref: 'jobprovider'
    },
    state:{
        type: mongoose.Schema.Types.String,
        ref: 'jobprovider'
    },
    title :{
        type: String,
        required: true,
    },
    role :{
        type: String,
        required: true,
    },
    type :{
        type: String,
        required: true
    },
    skill:{
        type: String,
        default:""
    },
    hrname :{
        type: String,
        required: true,
    },
    description :{
        type: String,
        required: true
    },
    postdate :{
        type: Date,
        default: Date.now,
    },
    expfrom:{
        type:Number,
        default:0,
    },
    expto :{
        type:Number,
        default:0,
    },
})
const Job=mongoose.model('job',JobSchema);
// User.createIndexes();
module.exports=Job;

const express= require('express');
const fetchuser=require('../middleware/fetchuser')
const router=express.Router();
const Job=require('../models/Job');
const Jobprovider=require('../models/Jobprovider');
const JobSeeker = require('../models/Jobseeker');
const Application = require('../models/Application');
const sendMail=require('../sendMail');

//Route 1 : Change Application status Job  : http://localhost:5000/api/application/change/:id

router.post('/change',fetchuser,async (req,res)=>{
    try{
        let app=await Application.findOne({jobId:req.body.jobId,jobseekerId:req.body.jobseekerId});

        obj={}
        if(req.body.rejected){
            obj.rejected=1;
            obj.hired=0;
        }
        if(req.body.hired)
            obj.hired=1;
        if(req.body.round)
            obj.round=req.body.round

        let newapp=await Application.findByIdAndUpdate(app._id,{ $set: obj},{ new: true })

        res.json({success:true,newapp})
        }catch(error){
            res.status(500).send({success:false,error:"Some error occured"});
    }
})

//Route 2 : Change Application status send next  : http://localhost:5000/api/application/change/:id

router.post('/change/sendnext',fetchuser,async (req,res)=>{
    try{
        let app=await Application.findOne({jobId:req.body.jobId,jobseekerId:req.body.jobseekerId});

        let obj={}
        obj.round=app.round+1;

        let newapp=await Application.findByIdAndUpdate(app._id,{ $set: obj},{ new: true })

        res.json({success:true,newapp})
        }catch(error){
            res.status(500).send({success:false,error:"Some error occured"});
    }
})


module.exports=router 


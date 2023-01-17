const express= require('express');
const fetchuser=require('../middleware/fetchuser')
const router=express.Router();
const Jobprovider=require('../models/Jobprovider');
const Jobseeker=require('../models/Jobseeker');
const Job=require('../models/Job');
const Application=require('../models/Application');
const sendMail=require('../sendMail');



//Route 1 : Create User request : http://localhost:5000/api/jobprovider/createprofile

router.post('/createprofile',fetchuser,async (req,res)=>{
    
    let obj=req.body;
     
    try{
        //if exists then error
        let data=await Jobprovider.findOne({email:obj.email});
        if(data){
            return res.status(400).json({success:false,error:"Sorry a user with this email exist"})
        }

        //promise method-create a new user
        jobproviderdata = await Jobprovider.create(obj);
        
        res.json({success:true,jobproviderdata})
        }catch(error){
            // console.log(error)
            res.status(500).send({success:false,error:"Some error occured"});
    }
})


//check user exist in jobprovider table or not
//Route 2 : Find Jobprovider : http://localhost:5000/api/jobprovider/find/
router.post('/check/',fetchuser,async (req,res)=>{
    
    if(req.user.role!=="provider")
    {
        res.status(403).send({success:false,error:"can't have permission"});
    }

    try{
        let data=await Jobprovider.findOne({email:req.user.email});
        if(data){
            res.json({success:true})
        }
        else{
            res.json({success:false})
        }
        }catch(error){
            res.status(500).send({success:false,error:"Some error occured"});
        }
    })


//Route 3 : Find Jobprovider : http://localhost:5000/api/jobprovider/getprofile/
router.post('/getprofile/',fetchuser,async (req,res)=>{
    
    if(req.user.role!=="provider")
    {
        //console.log("provider is called")
        res.status(403).send({success:false,error:"can't have permission"});
    }

    try{
        let data=await Jobprovider.findOne({email:req.user.email});
        if(data){
            res.json({success:true,data})
        }
        else{
            res.json({success:false,error:"profile not found"});
        }
        }catch(error){
            res.status(500).send({success:false,error:"Some error occured"});
        }
    })


//Route 4 : Edit Jobprovider Profile: http://localhost:5000/api/jobprovider/editprofile/
router.post('/editprofile/',fetchuser,async (req,res)=>{
    
    if(req.user.role!=="provider")
    {
        res.status(403).send({success:false,error:"can't have permission"});
    }

    try{
        let editdata=req.body;
        let data=await Jobprovider.findOne({email:req.user.email});

        let jobs=await Job.find({postedby:data.id});
        for(let i=0; i<jobs.length; i++){
            await Job.findByIdAndUpdate(jobs[i]._id,{$set: {"cname" : editdata.cname, "city" : editdata.city, "state" : editdata.state}},{new: true})
        }
        
        if(data){
            
            let editeddata=await Jobprovider.findByIdAndUpdate(data.id,{$set: editdata},{new: true});
            res.json({success:true,editeddata})
        }
        else{
            res.json({success:false,error:"profile not found"});
        }
        }catch(error){
            res.status(500).send({success:false,error:"Some error occured"});
        }
    })

//Route 5 : Get User Email ID : http://localhost:5000/api/jobprovider/getemail
router.post('/getemail',fetchuser,async (req,res)=>{
    const user=await req.user;
    // console.log(req)
    try
    {
        res.json({success:true,email:user.email})
    }catch(error){
        res.status(500).send({success:false,error:[],warning:"Some error occured"});
    }
})

//Route 6 : Get Application Data : http://localhost:5000/api/jobprovider/getapplication/:id
router.post('/getapplication/:id',fetchuser,async (req,res)=>{
    const user=await req.user;
    try
    {
        let data1=await Application.find({"jobId":req.params.id,round:0,hired:0,rejected:0},{"jobseekerId":1})
        let data2=await Application.find({"jobId":req.params.id,round:1,hired:0,rejected:0},{"jobseekerId":1})
        let data3=await Application.find({"jobId":req.params.id,round:2,hired:0,rejected:0},{"jobseekerId":1})
        let data4=await Application.find({"jobId":req.params.id,hired:1,rejected:0},{"jobseekerId":1})
        let data5=await Application.find({"jobId":req.params.id,rejected:1,hired:0},{"jobseekerId":1})
        
        let arr1=[],arr2=[],arr3=[],arr4=[],arr5=[];

        data1.forEach((obj)=>{
            arr1.push({"_id": obj.jobseekerId});
        })

        data2.forEach((obj)=>{
            arr2.push({"_id": obj.jobseekerId});
        })

        data3.forEach((obj)=>{
            arr3.push({"_id": obj.jobseekerId});
        })

        data4.forEach((obj)=>{
            arr4.push({"_id": obj.jobseekerId});
        })

        data5.forEach((obj)=>{
            arr5.push({"_id": obj.jobseekerId});
        })

        let jbs1=[],jbs2=[],jbs3=[],jbs4=[],jbs5=[];

        if(arr1.length>0)
            jbs1=await Jobseeker.find({"$or":arr1},{"profileimage":0});
        if(arr2.length>0)
            jbs2=await Jobseeker.find({"$or":arr2},{"profileimage":0});
        if(arr3.length>0)
            jbs3=await Jobseeker.find({"$or":arr3},{"profileimage":0});
        if(arr4.length>0)
            jbs4=await Jobseeker.find({"$or":arr4},{"profileimage":0});
        if(arr5.length>0)
            jbs5=await Jobseeker.find({"$or":arr5},{"profileimage":0});

        res.json({success:true,data:[jbs1,jbs2,jbs3,jbs4,jbs5]})

    }catch(error){
        console.log(error)
        res.status(500).send({success:false,error:[],warning:"Some error occured"});
    }
})


//Routes for getting jobprovider profile by link whenever jobseeker click on link
//Route 7 : POST : http://localhost:5000/api/jobprovider/profile/:id

router.post('/profile/:id', fetchuser,async(req,res)=>{
    try{
        let jobprovider = await Jobprovider.findById(req.params.id);
        console.log("job provider is:" + jobprovider)
        if(!jobprovider)
        {
            return res.status(404).json({success:false,error:"User profile not found"})
        }
        res.json({success:true,data:jobprovider})

    }catch(error){
        res.status(500).send({success:false,error:"Some error occured"});
    }
})
module.exports=router
const express= require('express');
const router=express.Router();
const Jobseeker=require('../models/Jobseeker');
const Jobprovider=require('../models/Jobprovider');
const User=require('../models/User');
const Job=require('../models/Job');
const Application=require('../models/Application');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

//route for creating profile
router.post('/', fetchuser,
    async(req,res)=>{
        let obj=req.body;
        try{
        //if exists then error
        let data=await Jobseeker.findOne({email:obj.email});
        if(data){
            return res.status(400).json({success:false,error:"Sorry a user with this email exist"})
        }

        //promise method-create a new user
        jobseekerdata = await Jobseeker.create(obj);
        res.json({success:true,jobseekerdata})

        }catch(error){
            // console.log(error)
            res.status(500).send({success:false,error:"Some error occured"});
        }
    }
)

//route for fetching profile details
router.get('/fetchdetails',fetchuser, async (req, res)=>{
    try{
        const details = await Jobseeker.find({email:req.user.email})
        res.json(details)
    }
    catch(error){
        // console.error(error.message);
        res.status(500).json("Internal Server Error!")
    }
})

//route for updating profile
router.put('/updatedetails/:id',fetchuser,async (req, res) => {
    const {firstName,lastName,bio,contact,collage,degree,skills,resume,experience,language,englishlevel,city,state,profileimage} = req.body;
    
    //creating a updatedDetails object 
    const updatedDetails = {};
    if(firstName){updatedDetails.firstName = firstName};
    if(lastName){updatedDetails.lastName = lastName};
    if(bio){updatedDetails.bio = bio};
    if(contact){updatedDetails.contact = contact};
    if(collage){updatedDetails.collage = collage};
    if(degree){updatedDetails.degree = degree};
    if(skills){updatedDetails.skills = skills};
    if(resume){updatedDetails.resume = resume};
    if(experience){updatedDetails.experience = experience};
    if(language){updatedDetails.language = language};
    if(englishlevel){updatedDetails.englishlevel = englishlevel};
    if(city){updatedDetails.city = city};
    if(state){updatedDetails.state = state};
    if(profileimage){updatedDetails.profileimage = profileimage};

    //finding the details to be updated and update it.
    let jobseeker = await Jobseeker.findById(req.params.id);
    if(!jobseeker){return res.status(404).send("Not Found")}

    jobseeker = await Jobseeker.findByIdAndUpdate(req.params.id,{$set: updatedDetails},{new: true})
    res.json({success:true, jobseeker:jobseeker})
})

//Get User Email ID
//http://localhost:5000/api/jobprovider/getemail
router.post('/getemail',fetchuser,async (req,res)=>{
    const user=await req.user;
    //console.log(req)
    try{
        res.json({success:true,email:user.email})
    }catch(error){
        res.status(500).send({success:false,error:[],warning:"Some error occured"});
    }
})

//show jobs based on skills and experience to jobseeker
//http://localhost:5000/api/jobseeker/getjob
router.get('/getjob/',fetchuser,async (req,res)=>{
    try{
        let jobseeker = await Jobseeker.findOne({email:req.user.email});
        let data=await Job.find({expfrom: {$lte : jobseeker.experience}});

        //skill based filtering
        var skilljobarr = [];
        var jobseekerskills;

        //converting jobseeker-skills string to lowercase
        let seekerskills = jobseeker.skills.toLowerCase();
        //removing all whitespaces from jobseeker-skills string
        seekerskills = seekerskills.replace(/\s/g,'')
        //split the jobseeker-skills string from ","
        jobseekerskills = seekerskills.split(",");
        let jobs=await Job.find();
        var jobskills;
        let p=0;
        for(let i=0; i<jobs.length; i++){
            let count=0;
            //converting required-skill string to lowercase
            let requiredskills = jobs[i].skill.toLowerCase();
            //removing all whitespaces from required-skill string
            requiredskills = requiredskills.replace(/\s/g,'')
            //split the requiredskills string from ","
            jobskills = requiredskills.split(",");
            for(let j=0; j<jobskills.length; j++){
                for(let k=0; k<jobseekerskills.length; k++){
                    if(jobskills[j]==jobseekerskills[k]){
                        count++;
                        break;
                    }
                }
            }
            if(count==jobskills.length){
                skilljobarr[p] = jobs[i];
                p++;
            }
        }

        //experience based filtering
        var expjobarr = []
        for(let i=0; i<data.length; i++){
            let jobprovider=await Jobprovider.findById(data[i].postedby);
            obj={};
            obj.job = data[i];
            obj.jobprovider = jobprovider;
            expjobarr[i] = obj
        }
        
        //intersection of skill based filtering and experience based filtering
        var jobarr = []
        p=0;
        for(let i=0; i<skilljobarr.length; i++){
            for(let j=0; j<expjobarr.length; j++){
                if(skilljobarr[i].id==expjobarr[j].job.id){
                    jobarr[p] = expjobarr[j];
                    p++;
                }
            }
        }
        res.json({success:true,jobarr});
    }catch(error){
        res.status(500).send({success:false,error:"Some error occured"});
    }
})

//apply for the job
//http://localhost:5000/api/jobseeker/applyforjob
router.get('/applyforjob/:id', fetchuser,
    async(req,res)=>{
        try{
        //check whether jobseeker have already applied for that job or not
        let jobseeker = await Jobseeker.findOne({email:req.user.email});
        let applicationdata=await Application.findOne({jobId:req.params.id, jobseekerId:jobseeker.id});
        if(applicationdata){
            return res.status(400).json({success:false,error:"You have already applied for this job!"})
        }

        //otherwise store the data into database
        application = await Application.create({
            jobId : req.params.id,
            jobseekerId : jobseeker.id
        });
        res.json({success:true})
        }catch(error){
            res.status(500).send({success:false,error:"Some error occured"});
        }
    }
)

//show all jobs to jobseeker
//http://localhost:5000/api/jobseeker/getalljob
router.get('/getalljob/',async (req,res)=>{
    try{
        let job=await Job.find();
        var jobarr = []
        let n=10;
        if(job.length < 10)
            n=job.length;
            
        for(let i=0; i<n; i++){
            let jobprovider=await Jobprovider.findById(job[i].postedby);
            obj={};
            obj.job = job[i];
            obj.jobprovider = jobprovider;
            jobarr[i] = obj
        }
        res.json({success:true,jobarr});
    }catch(error){
        res.status(500).send({success:false,error:"Some error occured"});
    }
})

//searching
//http://localhost:5000/api/jobseeker/search
router.get('/search/:input', 
    async (req, res)=>{
        try{
            input = req.params.input.toLowerCase();
            // var regex = new RegExp(req.params.input,i);
            const job = await Job.find(
                {
                    "$or":[
                        {"title":{$regex: input, $options : "i"}},
                        {"skill":{$regex: input, $options : "i"}},
                        {"city":{$regex: input, $options : "i"}},
                        {"state":{$regex: input, $options : "i"}},
                        {"cname":{$regex: input, $options : "i"}}
                    ]
                }
            )
            
            var jobarr = []
            for(let i=0; i<job.length; i++){
                let jobprovider=await Jobprovider.findById(job[i].postedby);
                obj={};
                obj.job = job[i];
                obj.jobprovider = jobprovider;
                jobarr[i] = obj
            }
            
            res.json({success:true , jobarr})
        }
        catch(error){
            // console.error(error.message);
            res.status(500).json("Internal Server Error!")
        }
})

//Routes for getting profile by link
//Used to show profile in application to jobprovider

//Route : POST : http://localhost:5000/api/jobseeker/profile/:id

router.post('/profile/:id', fetchuser,async(req,res)=>{

    try{
        let jobseeker = await Jobseeker.findById(req.params.id);
        
        if(!jobseeker)
        {
            return res.status(404).json({success:false,error:"User profile not found"})
        }
        res.json({success:true,data:jobseeker})

    }catch(error){
        res.status(500).send({success:false,error:"Some error occured"});
    }
})

//Routes for getting job-applications
//Used to show job-applications to jobseeker

//Route : GET : http://localhost:5000/api/jobseeker/getapplicationstatus

router.get('/getapplicationstatus',fetchuser,async(req,res)=>{
    try{
        let jobseeker = await Jobseeker.findOne({email:req.user.email});
        let application = await Application.find({jobseekerId:jobseeker._id});

        var jobarr = []
        for(let i=0; i<application.length; i++){
            let job = await Job.findById(application[i].jobId);
            console.log(job)
            let jobprovider = await Jobprovider.findById(job.postedby);
            obj={};
            obj.application = application[i];
            obj.job = job;
            obj.jobprovider = jobprovider;
            jobarr[i] = obj
        }
        
        res.json({success:true,jobarr})

    }catch(error){
        res.status(500).send({success:false,error:"Some error occured"});
    }
})

module.exports=router 
        

    
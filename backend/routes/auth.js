const express= require('express');
const bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');
const fetchuser=require('../middleware/fetchUser')
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const sendMail=require('../sendMail');

//new............................................
//user verification model
const UserVerification=require('../models/UserVerification');

//user verification model
const PasswordReset=require('../models/PasswordReset');

//email handler
const nodemailer=require('nodemailer');

//unique string
const {v4 : uuidv4}=require('uuid');

//env variables
require('dotenv').config();

//nodemailer stuff
let transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS
    },secure:true,
    tls: {
        rejectUnauthorized: false
    }
})

//testing success
transporter.verify((error,success) => {
    if (error) {
        console.log(error)
    }
    else{
        console.log("Ready for messages");
        console.log(success)
    }
})
//new ended.............................................


// let subject="Congratilations !! Your Registartion is complete";
// let html=`<h2>For More Job Login </h2><p><a href="http://localhost:3000/login">Login Now</a></p>`;


//new................................................

//supporting function : send verification email
const sendVerificationEmail = ({_id, email}, res)=>{
    //url to be used in the email
    const currentUrl = "http://localhost:5000/";

    const uniqueString = uuidv4() + _id;

    //mail options
    const mailOptions = {
        from : process.env.AUTH_EMAIL,
        to : email,
        subject : "Verify your Email",
        html : `<p>Verify your email to complete signup and login to your account</p>
                <p>This link <b>expires in 6 hours</b></p>
                <p>Press <a href=${currentUrl + "api/auth/verify/" + _id + "/" + uniqueString}>here</a> to proceed.</p>`,
    };

    //hash the unique string
    const saltRounds = 10;
    bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashedUniqueString) =>{
        //set values in userVerification collection
        const newVerification = new UserVerification({
            userId : _id,
            uniqueString : hashedUniqueString,
            createdAt : Date.now(), 
            expiresAt : Date.now() + 21600000,
            // expiresAt : Date.now() + 60,
        })

        newVerification
        .save()
        .then(()=>{
            transporter.sendMail(mailOptions)
            .then(()=>{
                //email sent and verification record saved
                res.json({
                    success: true,
                    status : "PENDING",
                    message : "Please check your Inbox, we have sent you verification mail!"
                })
            })
            .catch((error)=>{
                let message = "Email verification failed!"
                console.log(message,error);
            })
        })
        .catch(()=>{
            let message = "Couldn't save verification email data!"
            console.log(message);
        })
    })
    .catch(()=>{
        let message = "An error occured while hashing email data!"
        console.log(message);
    });
}


// Route 6 : verifying email : http://localhost:5000/api/auth//verify/:userId/:uniqueString
router.get("/verify/:userId/:uniqueString",(req, res)=>{
    let {userId, uniqueString} = req.params;
    UserVerification
    .find({userId})
    .then((result)=>{
        if(result.length > 0){
            //user verification record exists so we proceed
            const {expiresAt} = result[0];
            const hashedUniqueString = result[0].uniqueString;
            console.log(result[0]);
            //checking for expired unique string
            if(expiresAt < Date.now()){
                //record has expired so we delete it
                UserVerification
                .deleteOne({userId})
                .then(()=>{
                    User.deleteOne({_id : userId})
                    .then(()=>{
                        let message = "Link has been expired! Please sign-up again!"
                        res.redirect(`http://localhost:3000/verified/${message}`)
                    })
                    .catch(() => {
                        let message = "Clearing user with expired unique string failed!"
                        console.log(message)
                    })
                })
                .catch(()=>{
                    let message = "An error occured while cleaning expired user verification record!"
                    console.log(message)
                })
            }
            else{
                //valid record exists so we validate the user string
                //first compare the hashed unique string
                bcrypt
                .compare(uniqueString,hashedUniqueString)
                .then((result) => {
                    if(result){
                        //strings match
                        User
                        .updateOne({_id:userId},{verified:true})
                        .then(()=>{
                            UserVerification
                            .deleteOne({userId})
                            .then(()=>{
                                // res.send({message : "Email verified successfully!", redirect_path: "http://localhost:3000/login/"});
                                let message = "Email verified successfully!"
                                res.redirect(`http://localhost:3000/verified/${message}`)
                            })
                            .catch(()=>{
                                let message = "An error occurred while finalizing successfull verification!"
                                console.log(message)
                            })
                        })
                        .catch(()=>{
                            let message = "An error occurred while updating user record to show verified!"
                            console.log(message)
                        })
                    }
                    else{
                        //existing record but incorrect verification details passed.
                        let message = "Invalid verification details passed. Check your Inbox."
                        console.log(message)
                    }
                })
                .catch(()=>{
                    let message = "An error occurred while comparing unique strings"
                    console.log(message)
                })
            }
        }
        else{
            //user verification record doesn't exist
            let message = "Account record does not exist or has been verified already, Please log in."
            console.log(message)
        }
    })
    .catch(()=>{
        let message = "An error occurred while checking for existing user verification record";
        console.log(message);
    })
})


//supporting function : sending mail for reset the password
const sendResetEmail = ({_id, email}, redirectUrl, res) => {
    const resetString = uuidv4() + _id;

    //first we clear all existing reset records
    PasswordReset
    .deleteMany({userId : _id})
    .then((result) => {
        //reset records deleted successfully
        //now we send an email

        //mail options
        const mailOptions = {
            from : process.env.AUTH_EMAIL,
            to : email,
            subject : "Password Reset",
            html : `<p>We heard that you lost the password.</p>
                    <p>Don't worry, use the below link to reset it.</p>
                    <p>This link <b>expires in 60 minutes</b></p>
                    <p>Press <a href=${redirectUrl + "/" + _id + "/" + resetString}>here</a> to proceed.</p>`,
        };

        //hash the reset string
        const saltRounds = 10;
        bcrypt
        .hash(resetString, saltRounds)
        .then((hashedResetString) => {
            //set values in password reset collection
            const newPasswordReset = new PasswordReset({
                userId : _id,
                resetString : hashedResetString,
                createdAt : Date.now(),
                expiresAt : Date.now() + 3600000
            })

            newPasswordReset
            .save()
            .then(()=>{
                transporter
                .sendMail(mailOptions)
                .then(()=>{
                    //reset email sent and password reset record saved
                    res.json({
                        success: true,
                        status : "PENDING",
                        message : "Please Check your Inbox, We have sent you Reset Password mail!",
                    });
                })
                .catch(error=>{
                    console.error(error);
                    res.json({
                        status : "FAILED",
                        message : "Password reset email failed!",
                    });
                })
            })
            .catch(error=>{
                console.error(error);
                res.json({
                    status : "FAILED",
                    message : "Couldn't save password reset data!",
                });
            })
        })
        .catch((error) => {
            console.log(error);
            res.json({
                status : "FAILED",
                message : "An error occured while hashing the password reset data!",
            });
        })
    })
    .catch((error)=>{
        //error while cleaning existing records
        console.log(error);
        res.json({
            status : "FAILED",
            message : "Clearing existing password reset record failed",
        });
    })
}


// Route 4 : Requesting for reset password : http://localhost:5000/api/auth/requestPasswordReset
router.post("/requestPasswordReset",(req, res)=>{
    const {email,redirectUrl} = req.body;
    //check if email exists
    User
    .find({email})
    .then((data)=>{
        if(data.length){
            //user exists

            //check if user is verified
            if(!data[0].verified){
                res.json({
                    status : "FAILED",
                    message : "Email hasn't been verified yet. Check your Inbox!",
                });
            }
            else{
                sendResetEmail(data[0],redirectUrl,res);
            }
        }
        else{
            res.json({
                status : "FAILED",
                message : "No Account with the supplied Email exists!",
            });
        }
    })
    .catch((error)=>{
        console.log(error);
        res.json({
            status : "FAILED",
            message : "an error occurred while checking for existing user",
        });
    })
})


// Route 5 : Actually reseting the password : http://localhost:5000/api/auth/resetPassword
router.post("/resetPassword", (req, res)=>{
    let {userId, resetString, newPassword} = req.body;

    PasswordReset
    .find({userId})
    .then((result)=>{
        if(result.length>0){
            //password reset record exists so we proceed
            const {expiresAt} = result[0];
            const hashedResetString = result[0].resetString;

            //checking for expired reset string
            if(expiresAt < Date.now()){
                PasswordReset
                .deleteOne({userId})
                .then(()=>{
                    //reset record deleted successfully
                    res.json({
                        status : "FAILED",
                        message : "Password reset link has been expired!",
                    });
                })
                .catch(error => {
                    //deleting failed
                    console.log(error);
                    res.json({
                        status : "FAILED",
                        message : "Clearing password reset record failed",
                    });
                })

            }
            else{
                //valid reset record exists so we validate the reset string
                //first compare the hashed reset string
                bcrypt
                .compare(resetString, hashedResetString)
                .then((result)=>{
                    if(result){
                        //strings matched
                        //hash password again
                        const saltRounds = 10;
                        bcrypt
                        .hash(newPassword, saltRounds)
                        .then((hashednewPassword)=>{
                            //update user password
                            User
                            .updateOne({_id : userId}, {password: hashednewPassword})
                            .then(()=>{
                                //update completed. Now delete reset record
                                PasswordReset
                                .deleteOne({userId})
                                .then(()=>{
                                    //both user record and reset record updated
                                    res.json({
                                        success: true,
                                        status : "SUCCESS",
                                        message : "Password has been reset successfully.",
                                    });
                                })
                                .catch((error)=>{
                                    console.log(error)
                                    res.json({
                                        status : "FAILED",
                                        message : "An error occurred while finalizing password reset!",
                                    });
                                })
                            })
                            .catch((error)=>{
                                console.log(error)
                                res.json({
                                    status : "FAILED",
                                    message : "Updating user password failed!",
                                });
                            })
                        })
                        .catch((error)=>{
                            console.log(error);
                            res.json({
                                status : "FAILED",
                                message : "An error occurred while hashing the new password!",
                            });
                        })
                    }
                    else{
                        //existing record but incorrect reset string passed.
                        res.json({
                            status : "FAILED",
                            message : "Invalid password reset details passed!",
                        });
                    }
                })
                .catch((error)=>{
                    console.error(error)
                    res.json({
                        status : "FAILED",
                        message : "Comparing password reset strings failed!",
                    });
                });
            }
        }
        else{
            //password reset record doesn't exist
            res.json({
                status : "FAILED",
                message : "Password reset request not found!",
            });
        }
    })
    .catch(error=>{
        console.log(error);
        res.json({
            status : "FAILED",
            message : "Checking for existing password reset record failed!",
        });
    })
})
//new ended................................................

//Route 1 : Create User request : http://localhost:5000/api/auth/
router.post('/',
    [
        body('name',"Name must be altleast 3 character").isLength({ min: 3 }),
        body('email',"Email is not valid").isEmail(),
        body('password',"Password length must be atleast 5").isLength({ min: 5 }),
    ]
    ,async (req,res)=>{
    
    res.set('Access-Control-Allow-Origin', '*');
    //if not validate then show error's
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false,error: errors.array()});
    }

    //just 3 line for password hashing. Thank You bcrypt
    const salt=await bcrypt.genSalt(10);
    const securePass=await bcrypt.hash(req.body.password,salt);

    //check same email id person exist or not    
    try{
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({success:false,error:[],warning:"Sorry a user with this email already exists."})
        }

        //promise method-create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass,
            role:req.body.role,

            //new.................
            verified:false
            //new ended...........
        })

        //generate jwt token
        const JWT_SECRET="neelauth";
        const data={user:{id:user.id}};
        const authtoken=jwt.sign(data,JWT_SECRET);

        //new...........
        //handle account verification
        sendVerificationEmail(user,res);
        //new...........
        // res.json({success:true,user:user,jwt:authtoken})
        }catch(error){
            res.status(500).send({success:false,error:[],warning : "Some error occured"});
    }
})


//Route 2 : Login User request : http://localhost:5000/api/auth/login
router.post('/login',
    [
        body('email',"Email is not valid").isEmail(),
        body('password',"Password length must be atleast 5").exists(),
    ]
    ,async (req,res)=>{
    
    //if not validate then show error's
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({suceess:false,error: errors.array()});
    }

    const {email,password}=req.body;
    //check same email id person exist or not    
    try{
        let user=await User.findOne({email});
        console.log(user)
        if(!user){
            return res.status(400).json({success:false,error:[],warning:"Sorry Invalid credentials"})
        }
        else if(!user.verified){
            return res.status(400).json({success:false,error:[],warning:"Plese Verify your email!!"})
        }

        //match password
        const comparePassword=await bcrypt.compare(password,user.password);
        if(!comparePassword)
        {
            return res.status(400).json({success:false,error:[],warning:"Sorry Invalid credentials"})
        }

        //generate jwt token
        const JWT_SECRET="neelauth";
        //const data={user:{id:user.id}};
        const data={user};
        const authtoken=jwt.sign(data,JWT_SECRET);
        res.json({success:true,authtoken:authtoken,role:user.role,name:user.name})
        }catch(error){
            res.status(500).send({success:false,error:[],warning:"Some error occured"});
        }
})

// Route 3 : get User  request : http://localhost:5000/api/auth/getuser
router.post('/getuser',fetchuser,async (req,res)=>{
    try {
        res.json({success:true,role:req.user.role});
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})

module.exports=router 

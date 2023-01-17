const nodemailer=require('nodemailer')
require('dotenv').config();

const sendMail=(to,subject,html)=>{
    //make transporter
    var transporter = nodemailer.createTransport({
        service:'gmail',
        auth : {     
            user:process.env.AUTH_EMAIL,
            pass:process.env.AUTH_PASS
        },
        secure:true,
        tls: {
            rejectUnauthorized: false
        }
    });
 
    //prepare Mail Option
    var mailOptions = {
        from : process.env.AUTH_EMAIL,
        to : to ,
        subject : subject ,
        html : html
    }

    //send Mail
    transporter.sendMail(mailOptions,function(err,info){
        if(err){
            console.log(err);
            return false;
        }else{
            console.log("Email sent: " + info.response );
            return true;
        }
    });
}

module.exports=sendMail;

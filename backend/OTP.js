const nodemailer=require('nodemailer')

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const sendMail=(email)=>{
    //make transporter
    var transporter = nodemailer.createTransport({
        service:'gmail',
        auth : {     
            // user:process.env.DEFAUL_EMAIL,
            // pass:process.env.DEFAUL_EMAIL_PASSWORD
            user:'nbjtestproject@gmail.com',
            pass:'nbj@1234'
        },
        secure:true,
        tls: {
            rejectUnauthorized: false
        }
    });
    //generate OTP
    var OTP = getRandomInt(1000, 10000).toString()

    //prepare Mail Option
    var mailOptions = {
        from : 'nbjtestproject@gmail.com',
        to : email ,
        subject : 'Jobguru.com - Verify your Email ✔' ,
        text : "abcdefghijklmnopqrstuvwxyz",
        // html : "<h5>Your OTP is "+OTP +"</h5>"
        html : `<p><span style="font-size:18px">Please use the below OTP to verify your email information on jobguru.com &nbsp;</span></p>&nbsp;<h1><span style="color:#000080"><em><strong>`+OTP+`</strong>
        </em><span></h1><br /><span style="font-size:18px"><strong>Note : Do not share your OTP&nbsp;to anyone
        </strong><br /><br /><br />Thanks,<br/>Team ChillyFood</span>`
    }

    //send Mail
    transporter.sendMail(mailOptions,function(err,info){
        if(err){
            console.log(err);
        }else{
            console.log("Email sent: " + info.response );
        }
    });
}

module.exports=sendMail;

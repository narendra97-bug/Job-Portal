const sendMail=require('./sendMail');

let to='19ceuef014@ddu.ac.in';
let subject="Just Chill this is student life !!";
let html=`<p>Hello</p>`;
if(sendMail(to,subject,html))
{
    console.log("Email sent successfully !!")
}else{
    console.log("Email doesn't sent successfully !!")
}
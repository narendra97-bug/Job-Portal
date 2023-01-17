const mongoose=require('mongoose');
const {Schema}=mongoose;

const UserVerificationSchema=new Schema({
    userId : String,
    uniqueString : String,
    createdAt : Date,
    expiresAt : Date,
})
const UserVerification=mongoose.model('userverification',UserVerificationSchema);
// User.createIndexes();
module.exports=UserVerification;
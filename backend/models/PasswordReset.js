const mongoose=require('mongoose');
const {Schema}=mongoose;

const PasswordResetSchema=new Schema({
    userId : String,
    resetString : String,
    createdAt : Date,
    expiresAt : Date,
})
const PasswordReset=mongoose.model('passwordreset',PasswordResetSchema);
// User.createIndexes();
module.exports=PasswordReset;
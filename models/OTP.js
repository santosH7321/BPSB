const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,

    },
    createAt: {
        type:Date,
        default:Date.now(),
        expires: 5*60,
    }
});

// a function -> to send email--
async function sendVarificationEamil(email, otp){
    try{
        const mailResponse = await mailSender(email, "Varification email form Bhawan Public School", otp);
        console.log("Email Send Successfully", mailResponse);
    }
    catch(error){
        console.log("error occupied while sending email");
        throw error;
    }
}

OTPSchema.pre("save", async function(next){
    await sendVarificationEamil(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", OTPSchema);
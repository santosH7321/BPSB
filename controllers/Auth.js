const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");

//Send otp

exports.SendOTP = async(req, res) => {
    try{
        //fetch email from require ki body
        const {email} = req.body;

        //check user alrady exist

        const checkUserPresent = await User.findOne({email});

        //if user alreadt exist , then return a response

        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                massage:'User already resisterd',
            })
        }
        //generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        console.log("OTP generated", otp);

        //check unique opt or not

        let result = await OTP.findOne({otp: otp});

        while(result){
                otp = otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });

            result = await OTP.findOne({otp: otp});
        }
        const otpPayload = {email, otp};
        //create an entry in for otp 
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        //return response successful

        res.status(200).json({
            success:true,
            massage:'otp send successfuly',
            otp,
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            massage:error.massage,
        })
    }
}

//sign up

exports.signUp = async(req, res) => {
    //date fetch from request ki body
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp
    } = req.body;
    //validate karlo
    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
        return res.status(403).json({
            success:false,
            massage:"All fields are required",
        })
    }
    // 2 password match karo
    if(password !== confirmPassword){
        return res.status(400).json({
            success:true,
            massage:"password and Confirm Password is not same",
            //check user already exist or not 

            const existingUser = await User.findOne({email});
            if(existingUser){
                return res.status(400).json({
                    success: false,
                    massage:'User is already registered',
                });
            }
            //find most resent otp stored for the user
            const recentOtp = await OTP.find({email}.sort({createdAt:-1}).limit(1));
            console.log(recentOtp);

            //validation OTP
            if(recentOtp.length == 0){
                //OTP not found
                return res.status(400).json({
                    success:false,
                    massage:'OTP found',
                })
            }
            else if(otp !== recentOtp){
                //Invalid otp
                return res.status(400).json({
                    success:false,
                    massage:"Invalid OTP",
                });
            }
        })
    }
}

//Login


//change password
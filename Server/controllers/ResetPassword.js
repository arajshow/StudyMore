const User = require("../models/User");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");


exports.resetPasswordToken = async (req, res) => {

    try{

        // get email from req body
        const {email} = req.body;

        // check user for this email, email validation
        const user = await User.findOne({email: email});
        if(!user){
            return res.json({
                success: false,
                message: `your email is not registered`
            })
        }

        // generate token
        const token = crypto.randomUUID();

        // update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
            {email: email},
            {
                token: token,
                resetPasswordExpires: Date.now() + 5*60*1000,
            },
            {new:true},
        )

        // create url
        const url = `http://localhost:3000/update-password/${token}`;

        // send email containing the url
        await mailSender(email,
            "password reset link",
            `Password Reset Link: ${url}`);


        // return response
        return res.json({
            success:true,
            message: "password reset email send successfully",
            //updatedDetails  //remove it later as it has token
        })

    }
    catch(error){

        return res.status(400).json({
            success:false,
            message: "error in reset password ",
        })

    }
}


exports.resetPassword = async (req, res) => {

    try{

        // data fetch
        const {password, confirmPassword, token} = req.body;

        // validation
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message: "password not matching",
            })           
        }

        // get userdetails from db using token
        const userdetails = await User.findOne({token:token});

        // if no entry -- invalid token
        if(!userdetails){
            return res.status(400).json({
                success:false,
                message: "token is invalid",
            })
        }

        // token time check
        if( userdetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success:false,
                message: "token is expired, try again",
            })
        }

        // if new password is same as old password then return

        if(await bcrypt.compare(password, userdetails.password)){
            return res.status(400).json({
                success:false,
                message: "Try new password, it is your old one so",
            })              
        }

        // hash pass
        const hashPass = await bcrypt.hash(password, 10);

        // pass update
        // userdetails.password = hashPass;
        await User.findOneAndUpdate(
            {token: token},
            {
                password : hashPass,
            },
            {new: true},
        )
        // return response
        return res.json({
            success:true,
            message: "new password updated",
        })

    }
    catch(error){
        return res.status(400).json({
            success:false,
            message: "something went wrong in password reset, try again",
        })
    }
}



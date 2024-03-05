const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/OTP");
const mailSender = require("../utils/mailSender");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// otp send
exports.sendOTP = async (req, res) => {

    try{

        const {email} = req.body;
        

        // check user is present in db or not
        const checkUserExist = await User.findOne({email});
        

        // return if user already exist
        if(checkUserExist){
            return res.status(401).json({
                success: false,
                message: "User already exist",
            })
        }

        // generate otp
        var otp = otpGenerator.generate(6, {
            lowerCaseAlphabets:false,
            upperCaseAlphabets: false,
            specialChars: false,
        });

        // checking this otp is repeted or not
        const result = await OTP.findOne({otp: otp});
		console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);
        // re-generating otp till we get new and unique one
        // we can upgarade this logic further
        while(result){
            otp = otpGenerator.generate(6, {
                lowerCaseAlphabets:false,
                upperCaseAlphabets: false,
                specialChars: false,
            });

            result = await OTP.findOne({otp: otp});
        }

        // create it in db
        const otpPaylod = {email, otp};
        const otpBody =  await OTP.create(otpPaylod);
        console.log("otp stored in db : ", otpBody);

        return res.json({
            success: true,
            message: "otp sent successfully",
            otp,
        })

    }
    catch(error){
        console.log("error in sending otp: ", error);
        return res.status(400).json({
            success: false,
            message:"User can't be registered, please try again",
        }) 
    }
}

// sign up
exports.signUp = async (req, res) => {

    try{

        // data fetch
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
        } = req.body;

        // validation
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success: false,
                message:"All details are required",
            })
        }


        // check user already exist or not
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(402).json({
                success: false,
                message:"User already registered, go log in",
            })         
        }

        // otp validation
        TODO: "createdAT pta kro";

        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);

        console.log("recentOtp", recentOtp);

        if(recentOtp.length === 0){
            return res.status(404).json({
                success: false,
                message:"OTP not found",
            })  
        }
        else if(otp !== recentOtp[0].otp){
            return res.status(405).json({
                success: false,
                message:`Invalid OTP as real is ${recentOtp.otp}`,
            })  
        }

        // console.log("yha tak shi hai",
        //     accountType,
        //     firstName,
        //     lastName,
        //     email,
        //     password,
        //     confirmPassword,
        //     otp,        
        // );



        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);



        // entry in db
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/6.x/lorelei/svg?seed=${firstName}`,

        })

        // return res
        return res.json({
            success: true,
            message: "user registered successfully",
            user,
        })

    }
    catch(error){
        console.log("error in user registration: ", error);
        return res.status(407).json({
            success: false,
            message:`User can't be registered, please try again, reason: ${error}`,
        })         
    }

}

// log in
exports.logIn = async (req, res) => {

    try{
        // get data from req body
        const {email, password} = await req.body;

        // validation data
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message:"Fill all details",
            })            
        }

        console.log("email, pass", typeof(email), password);

        // user check exist or not
        const user = await User.findOne({email}).populate("additionalDetails").exec();
        console.log("user", user);
        if(!user){
            return res.status(401).json({
                success: false,
                message:"Email address isn't Connected, Signup Please",
            })              
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              // Handle error
                return res.status(400).json({
                    success: false,
                    message:`Incorrect Password`,
                }) 

            } else if (result === true) {
              // Passwords match; allow login

                const payload = {
                    email: user.email,
                    id: user._id,
                    accountType: user.accountType,
                }

                const token = jwt.sign(
                                // payload
                                payload,
                                process.env.JWT_SECRET,
                                {
                                    expiresIn: "24h",
                                }
                            );
                
                // dosent work without making user a object
                // user = user.toObject();
                user.token = token;
                user.password = undefined;

                const options = {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly:true,
                }

                res.cookie("token", token, options).status(200).json({
                    success:true,
                    token,
                    user,
                    message: "Logged In",
                });


            } else {
              // Passwords do not match; deny login

                return res.status(403).json({
                    success:false,
                    message:"Incorrect Password"
                }); 
            }
          });


    }
    catch(error){
        console.log("login error", error)
        return res.status(400).json({
            success: false,
            message:`Login failed`,
        }) 

    }
}


// change Password
exports.changePassword = async (req, res) => {
    try{

		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

        // get data from req body -> oldPass, newPass, confPass
        const {oldPassword, newPassword, confirmPassword} = req.body;

        if(newPassword!==confirmPassword){
            return res.json({
                success:false,
                message:`The password and confirm password does not match`,
            })
        }

        if(await bcrypt.compare(oldPassword, userDetails.password)){

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            const updatedUserDetails = await User.findOneAndUpdate(
                req.user.id,
                {password:hashedPassword},
                {new:true},
            )

            const emailResponse = await mailSender(updatedUserDetails.email, 				passwordUpdated(
                updatedUserDetails.email,
                `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
            ));

            console.log("Email sent successfully:", emailResponse.response);

            return res.status(500).json({
                success:true,
                message:`password changed successfully`,
            })

        }else{
            return res.json({
                success:false,
                message:`old password is wrong, try again`,
            })
        }

        

        // update pass in DB

        // send mail -password updated

        // return response
        
    }
    catch(error){
        console.log("error in password change: ", error);
        return res.json({
            success:false,
            message:`something went wrong, try again`,
        })
    }
}


// if any error comes in change password, go through below code of password change


// // Controller for Changing Password
// exports.changePassword = async (req, res) => {
// 	try {
// 		// Get user data from req.user
// 		const userDetails = await User.findById(req.user.id);

// 		// Get old password, new password, and confirm new password from req.body
// 		const { oldPassword, newPassword, confirmNewPassword } = req.body;

// 		// Validate old password
// 		const isPasswordMatch = await bcrypt.compare(
// 			oldPassword,
// 			userDetails.password
// 		);
// 		if (!isPasswordMatch) {
// 			// If old password does not match, return a 401 (Unauthorized) error
// 			return res
// 				.status(401)
// 				.json({ success: false, message: "The password is incorrect" });
// 		}

// 		// Match new password and confirm new password
// 		if (newPassword !== confirmNewPassword) {
// 			// If new password and confirm new password do not match, return a 400 (Bad Request) error
// 			return res.status(400).json({
// 				success: false,
// 				message: "The password and confirm password does not match",
// 			});
// 		}

// 		// Update password
// 		const encryptedPassword = await bcrypt.hash(newPassword, 10);
// 		const updatedUserDetails = await User.findByIdAndUpdate(
// 			req.user.id,
// 			{ password: encryptedPassword },
// 			{ new: true }
// 		);

// 		// Send notification email
// 		try {
// 			const emailResponse = await mailSender(
// 				updatedUserDetails.email,
// 				passwordUpdated(
// 					updatedUserDetails.email,
// 					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
// 				)
// 			);
// 			console.log("Email sent successfully:", emailResponse.response);
// 		} catch (error) {
// 			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
// 			console.error("Error occurred while sending email:", error);
// 			return res.status(500).json({
// 				success: false,
// 				message: "Error occurred while sending email",
// 				error: error.message,
// 			});
// 		}

// 		// Return success response
// 		return res
// 			.status(200)
// 			.json({ success: true, message: "Password updated successfully" });
// 	} catch (error) {
// 		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
// 		console.error("Error occurred while updating password:", error);
// 		return res.status(500).json({
// 			success: false,
// 			message: "Error occurred while updating password",
// 			error: error.message,
// 		});
// 	}
// };
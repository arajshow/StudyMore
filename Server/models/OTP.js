const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerifacationTemplate");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 600*60,
    },

});

async function sendVerificationEmail(email, otp){
    try{

        const mailResponse = await mailSender(email, "verification mail", emailTemplate(otp));
        console.log("Email sent successfully", mailResponse);

    }
    catch(error){
        console.log("error in sending verification mails: ", error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next){

    console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

module.exports = mongoose.model("OTP", OTPSchema);
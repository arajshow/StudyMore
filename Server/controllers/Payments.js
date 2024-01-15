const User = require("../models/User");
const Course = require("../models/User");
const mailSender = require("../utils/mailSender");
const {instance} = require("../config/razorpay");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");


// capture the payment and initiate the razorpay order
exports.capturePayment = async (req, res) => {

    // as we have to do many operations and for each operations different kind of error can come , so
    // we are going with multiple try-catch instance to handle error individually for different logics

    // get courseId and UserId
    const {courseId} = req.body;
    const userId = req.user.id;

    // validation
    if(!courseId){
        return res.json({
            success:false,
            message:'Please provide valid course ID',
        })        
    };

    // valid courseDetails
    let courseDetails; //we require this further so create this outside the scope
    try{

        courseDetails = await Course.findById(courseId);
        if(!courseDetails){
            return res.json({
                success:false,
                message:'Could not find the course',
            });           
        }

        // user already enrolled for same course
            // here userId is in string, convert it in Object.id
        const uid = new mongoose.Types.ObjectId(userId);
        if(courseDetails.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:'Student is already enrolled',
            });            
        }

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }

    // create order by razorpay instance
    const amount = courseDetails.price;
    const currency = "INR";

    const options = {
        amount: amount*100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes:{
            courseId,
            userId,
        }
    };

    try{

        // initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        // return response
        return res.status(200).json({
            success:true,
            courseName: courseDetails.courseName,
            courseDescription: courseDetails.courseDescription,
            thumbnail: courseDetails.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        });
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Could not initiate order",
        });
    }

}


// verify signature of Razorpay and server

exports.verifySignature = async (req, res) => {

    const webhookSecret = "12345678";

    //razorpay give their signature in header in key: value pair where key is always "x-razorpay-signature";
    const signature = req.headers["x-razorpay-signature"];

    const shasum =  crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){

        console.log("Payment is Authorized");

        // notes which is passed during order create can be accessed by this path
        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try{

            // need to perform some actions when course is purchased by user

            // find the course and add student in enrolled student section
            const enrolledCourse = await Course.findOneAndUpdate(
                                                                {_id:courseId},
                                                                {$push:{
                                                                    studentsEnrolled:userId,
                                                                }},
                                                                {new:true},
            );

            // validation
            if(!enrolledCourse) {
                return res.status(500).json({
                    success:false,
                    message:'Course not Found',
                });
            }   

            console.log(enrolledCourse);

            // find student and add this course in it's list
            const enrolledStudent = await User.findOneAndUpdate(
                                                                {_id:userId},
                                                                {$push: {
                                                                    courses:courseId,
                                                                }},
                                                                {new:true},
            );

            console.log(enrolledStudent);

                //mail send krdo confirmation wala 
                const emailResponse = await mailSender(
                                        enrolledStudent.email,
                                        "Congratulations from CodeHelp",
                                        "Congratulations, you are onboarded into new CodeHelp Course",
                );

                console.log(emailResponse);
                return res.status(200).json({
                    success:true,
                    message:"Signature Verified and Course Added",
                });


        }       
        catch(error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    }
    else {
        return res.status(400).json({
            success:false,
            message:'Invalid request',
        });
    }
}

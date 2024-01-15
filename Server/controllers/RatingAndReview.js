const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");


// create rating
exports.createRating= async (req, res) => {

    try{

        // fetch data
        const {courseId, rating, review}  = req.body;

        // fetch user id
        const userId = req.user.id;

        const courseDetails = await Course.findOne(
            {_id: courseId,
            studentsEnrolled: { $elemMatch: {$eq: userId}}}
            // TODO: new mongoose.Types.ObjectId(userId)
            // here user id is in string, why we have to check for mongoose object id na
        );

        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: `student is not enrolled in this course`,
            })
        };

        // check whether user already reviewed this course
        const alreadyReciewed = await RatingAndReview.findOne({
                                                            user: userId,
                                                            course: courseId
        });

        if(!alreadyReciewed){
            return res.status(400).json({
                success: false,
                message: `user already reviewed this course`,
            })
        };


        // create review
        const ratingAndReview = await RatingAndReview.create({
            user: userId,
            course: courseId,
            rating,
            review,
        });


        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    ratingAndReviews:ratingAndReview._id,
                }
            },
            {new: true}
        );
        console.log(updatedCourseDetails);

        // return res
        return res.status(200).json({
            success:true,
            message:`rating and review created successfully`,
            data: ratingAndReview,
        });

    }
    catch(error){

        return res.status(400).json({
            success: false,
            message: error.message,
        }) 
    }
}

// get average rating
exports.getAverageRating = async (req, res) => {

    try{

        // get course id
        const {courseId} = req.body;

        // calculate avg rating, here output is array
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating: { $avg: "rating"},
                }
            }
        ]);

        // return rating
        if(result.length > 0){
            return res.status(200).json({
                success: false,
                averageRating: result[0].averageRating
            })
        }

        // if no rating found
        return res.status(200).json({
            success:true,
            message: `Average Rating is 0, no rating given till now`,
            averageRating: 0,
        })
    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}


// get all rating
exports.getAllRating = async (req, res) => {

    try{

        const allReviews = await RatingAndReview.find({})
                                                .sort({rating: "desc"})
                                                .populate({
                                                    path: "user",
                                                    select: "firstName lastName email image",
                                                })
                                                .populate({
                                                    path: "course",
                                                    select: "courseName",
                                                }).exec();

        return res.status(200).json({
            success:true,
            message: `All review fetched successfully`,
            data:allReviews,
        })

    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
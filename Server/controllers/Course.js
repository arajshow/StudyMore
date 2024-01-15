const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");


exports.createCourse = async (req, res) => {

    try{
        // fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, category} = req.body;
        

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail){
            return res.status(404).json({
                success:false,
                message: "All fields are required",
            })        
        }

        
        // check for instructor
        // console.clear();
        
        // console.log("chlo",  req.user);
        
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);

        

        // instructor validation
        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message: "instructor is invalid",
            })
        }



        const categoryDetails = await Category.findById(category);

        // category validation
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message: "Category details not found",
            })
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create DB
        const newCourse = await Course.create({
            courseName:courseName,
            coursedescription:courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price:price,
            thumbnail:thumbnailImage.secure_url,
            category:categoryDetails._id,

        });

        // add this new course to the user schema of Instructor
        // update the user/instructor schema
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    courses:newCourse
                }
            },
            {new:true},
        )

        // update the category schema
        await Category.findByIdAndUpdate(
            {_id:categoryDetails._id},
            {
                $push: {
                    course: newCourse,
                },
            },
            {new:true},
        )


        return res.status(200).json({
            success:true,
            message:`Course created Successfully`,
            newCourse
        })
    }
    catch(error){   
        return res.status(400).json({
            success:false,
            message: "course creation got Failed",
            error: error.message,
        })
    }
}


// get allCourses handler function

exports.getAllCourses = async (req, res) => {
    try{

        const allCourses = await Course.find({}, {courseName:true,
                                                price:true,
                                                thumbnail:true,
                                                instructor:true,
                                                ratingAndReviews:true,
                                                }).populate("instructor")
                                                .exec();

        return res.status(200).json({
            success:true,
            message:`Data for all courses fetched successfully`,
            data:allCourses,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message: `Cannot Fetch course data`,
            error:error.message,
        })
    }
}


// get course detail with all objectid populated

exports.getCourseDetails = async (req, res) => {

    try{

        // fetch id
        const {courseId} = await req.body;

        const courseDetails = await Course.find(
                                                {_id:courseId},
                                            ).populate(
                                                {
                                                    path:"instructor",
                                                    populate: {
                                                        path: "additionalDetails",
                                                    },
                                                }
                                            )
                                            .populate({
                                                path: "courseContent",
                                                populate: {
                                                    path: "subSection",
                                                }
                                            })
                                            // .populate("ratingAndReviews")
                                            .populate("category")
                                            .exec();

        // validation
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message: `could not find the course with ${courseId}`,
            })        
        }

        return res.status(200).json({
            success:true,
            message: `Course details fetched successfully`,
            data: courseDetails,
        })

    }
    catch(error){

        return res.status(400).json({
            success:false,
            message: error.message,
        }) 

    }

}

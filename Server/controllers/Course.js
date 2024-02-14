const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const Category = require("../models/Category");
const User = require("../models/User");
const { convertSecondsToDuration } = require("../utils/secToDuration.js")
const {uploadImageToCloudinary} = require("../utils/imageUploader");


exports.createCourse = async (req, res) => {

    try{
        // fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, category} = req.body;
        

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // console.log("data bhai", courseName, courseDescription, whatYouWillLearn, price, category);

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category 
            || !thumbnail
            ){
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
            courseDescription:courseDescription,
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
                    courses: newCourse,
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

exports.editCourse = async (req, res) => {
    try{

        const { courseId} = req.body
        const updates = req.body
        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({ error: "Course not found" })
        }

        if(req.files){
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnailImage.secure_url
        }

        // update only fields that are present in req body
        for( const key in updates){
            if(updates.hasOwnProperty(key)){
                if(key === "tag" || key === "instruction"){
                    course[key] = JSON.parse(updates[key])
                }else{
                    course[key] = updates[key]
                }
            }
        }

        await course.save()

        const updatedCourse = await Course.findOne({
            _id: courseId,
        })
        .populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
            path: "subSection",
            },
        })
        .exec()



        res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
        })
        
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
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

        const courseDetails = await Course.findOne(
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
                                            .populate("ratingAndReviews")
                                            .populate("category")
                                            .exec();

        // validation
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message: `could not find the course with ${courseId}`,
            })        
        }

        console.log("course bee", courseDetails);

        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach( (content) => {
            content.subSection.forEach( (subSection) => {
                const timeDurationInSeconds = parseInt( subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        });

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success:true,
            message: `Course details fetched successfully`,
            data: {courseDetails,
            totalDuration,}
        })

    }
    catch(error){

        return res.status(400).json({
            success:false,
            message: error.message,
        }) 

    }

}

exports.getFullCourseDetails = async (req, res) => {

    try{

        // fetch id
        const {courseId} = await req.body;
        const userId = req.user.id;

        const courseDetails = await Course.findOne(
                                                {_id:courseId},
                                            ).populate(
                                                {
                                                    path:"instructor",
                                                    populate: {
                                                        path: "additionalDetails",
                                                    },
                                                }
                                            )
                                            .populate("category")
                                            .populate("ratingAndReviews")
                                            .populate({
                                                path: "courseContent",
                                                populate: {
                                                    path: "subSection",
                                                },
                                            })
                                            .exec();

        let courseProgressCount = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId,
        })

        console.log("courseProgressCount : ", courseProgressCount)

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        }

        let totalDurationInSeconds = 0;
        console.log("courseDetails.courseContent : ", courseDetails)
        courseDetails.courseContent.forEach( (content) => {
            content.subSection.forEach( (subSection) => {
                const timeDurationInSeconds = parseInt( subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        });

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success:true,
            message: `Course details fetched successfully`,
            data: {
                courseDetails,
                totalDuration,
                completedVideos : courseProgressCount?.completedVideos 
                ? courseProgressCount?.completedVideos : [],
            }
        })

    }
    catch(error){

        return res.status(400).json({
            success:false,
            message: error.message,
        }) 

    }

}

// get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
    try {
        // Get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id

        // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({ createdAt: -1 })

        // Return the instructor's courses
        res.status(200).json({
            success: true,
            data: instructorCourses,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}

// Delete the Course
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body

        // Find the course
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled
        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, {
                $pull: { courses: courseId },
            })
        }

        // Delete sections and sub-sections
        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
        // Delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }

            // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }

        // Delete the course
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}

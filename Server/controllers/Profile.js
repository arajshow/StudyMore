const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");

exports.updateProfile = async (req, res) => {
    try{
        // fetch data
        const {dateOfBirth="", about="", gender, contactNumber} = await req.body;

        const userId = await req.user.id;

        const userDetails = await User.findById(userId);
        const profileDetails = await Profile.findById(userDetails.additionalDetails);

        // update profile details
        profileDetails.gender = gender;
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        // return response
        // return response
        return res.status(200).json({
            success:true,
            message: "profile updated successfully",
            profileDetails,
        });

    }
    catch(error){
        return res.status(400).json({
            success:false,
            message: "unable to update profile, try again",
        });
    }
}

exports.deleteProfile = async (req, res) => {

    try{

        // fetch data
        const userId = await req.user.id;
        const userDetails = await User.findById(userId);

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message: "Misssing Properties",
            });             
        }

        // delete profile
        await Profile.findByIdAndDelete(userDetails.additionalDetails);

        // delete enrolled students from count of course
        // TODO: delete course associated with it

        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success:true,
            message: "profile deleted successfully",
        });

    }
    catch(error){
        return res.status(400).json({
            success:false,
            message: `unable to delete profile, try again-> ${error} `,
        });
    }
}


exports.getAllUserDetails = async (req, res) => {
    try{

        // fetch data
        const userId = await req.user.id;

        const userDetails = await User.findById(userId).populate("additionalDetails").exec();

        // return res
        return res.status(200).json({
            success:true,
            message: "user data fetched successfully",
            userDetails,
        });        


    }
    catch(error){
        return res.status(400).json({
            success:false,
            message: "unable to retrive user details, try again",
            error : error.message
        });        
    }
}


exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )

      console.log("userId:", userId);
      console.log("image:", image);

      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `updateDisplayPicture error is ${error}`,
      })
    }
};

  
exports.getEnrolledCourses = async (req, res) => {
	try {
	  const userId = req.user.id
	  let userDetails = await User.findOne({
		_id: userId,
	  })
		.populate({
		  path: "courses",
		  populate: {
			path: "courseContent",
			populate: {
			  path: "subSection",
			},
		  },
		})
		.exec()

    // converted into object so that we can manully add courseProgress
	  userDetails = userDetails.toObject();

	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0,
        )
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
        totalDurationInSeconds
        )
        SubsectionLength +=
        userDetails.courses[i].courseContent[j].subSection.length
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      })
      courseProgressCount = courseProgressCount?.completedVideos.length
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
        Math.round(
          (courseProgressCount / SubsectionLength) * 100 * multiplier
        ) / multiplier
      }
	  }
  
	  if (!userDetails) {
		return res.status(400).json({
		  success: false,
		  message: `Could not find user with id: ${userDetails}`,
		})
	  }
	  return res.status(200).json({
		success: true,
		data: userDetails.courses,
	  })
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}
  }

  
exports.instructorDashboard = async(req, res) => {
	try{
		const courseDetails = await Course.find({instructor:req.user.id});

		const courseData  = courseDetails.map((course)=> {
			const totalStudentsEnrolled = course.studentsEnrolled.length
			const totalAmountGenerated = totalStudentsEnrolled * course.price

			//create an new object with the additional fields
			const courseDataWithStats = {
				_id: course._id,
				courseName: course.courseName,
				courseDescription: course.courseDescription,
				totalStudentsEnrolled,
				totalAmountGenerated,
			}
			return courseDataWithStats
		})

		res.status(200).json({courses:courseData});

	}
	catch(error) {
		console.error(error);
		res.status(500).json({message:"Internal Server Error"});
	}
}

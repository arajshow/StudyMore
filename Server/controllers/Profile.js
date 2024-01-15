const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

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
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
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
};
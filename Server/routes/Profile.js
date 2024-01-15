const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth")

const {
    updateProfile,
    deleteProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses
} = require("../controllers/Profile");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
 

router.delete("/deleteProfile", auth, deleteProfile);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUserDetails);

// get Enroled Courses
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

module.exports = router;
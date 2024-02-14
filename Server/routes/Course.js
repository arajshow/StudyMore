// import the required module
const express = require("express");
const router = express.Router();

const {
    auth, 
    isInstructor,
    isStudent,
    isAdmin
} = require("../middleware/auth");

const {
    createCourse,
    editCourse,
    getAllCourses,
    getCourseDetails,
    getFullCourseDetails,
    getInstructorCourses,
    deleteCourse
} = require("../controllers/Course");

const {
    showAllCategories,
    createCategory,
    categoryPageDetails
} = require("../controllers/Category");

const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/Section");

const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controllers/SubSection");

const {
    createRating,
    getAverageRating,
    getAllRating,
} = require("../controllers/RatingAndReview");

const {
    updateCourseProgress
} = require("../controllers/courseProgress");


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/addSubSection", auth, isInstructor, createSubSection);

// i have used put on place of post as it is for update in DB
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/editCourse", auth, isInstructor, editCourse);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);

// used delete on place of post as delete command
router.delete("/deleteCourse", deleteCourse);
router.post("/deleteSection", auth, isInstructor, deleteSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

router.get("/getAllCourses", getAllCourses);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.post("/getCourseDetails", getCourseDetails);
router.post("/getFullCourseDetails", auth, getFullCourseDetails)

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here

router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating) //not called yet
router.get("/getReviews", getAllRating)

module.exports = router;
const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const {
    logIn,
    signUp,
    sendOTP,
    changePassword,
} = require("../controllers/Auth");

const {resetPasswordToken,
        resetPassword} = require("../controllers/ResetPassword");

const {auth} = require("../middleware/auth");

// Routes for Login, Signup, and Authentication

// *********************************************************************
// Authentication routes
// *********************************************************************

// Route for user login
router.post("/login", logIn);

// Route for user signup
router.post("/signup", signUp);

// Route for sending OTP  to user
router.post("/sendotp", sendOTP);

// route for changing the password
router.post("/changePassword", auth, changePassword);


// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// router for resetting user's password after verification
router.post("/reset-password", resetPassword);

// export the router for use in the main application
module.exports = router






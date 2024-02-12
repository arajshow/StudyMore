const express = require("express");
const router = express.Router();

const {auth, isInstructor, isStudent, isAdmin} = require("../middleware/auth");

const {capturePayment, verifyPayment, sendPaymentSuccessEmail} = require("../controllers/Payments");

// ******************************************************************************************
// Payment Routes
// ******************************************************************************************

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router;
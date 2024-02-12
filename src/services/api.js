
const BASE_URL = process.env.REACT_APP_BASE_URL

// auth endpoints taken from user routes
export const endpoints = {
    SENDOTP_API : BASE_URL + "/auth/sendotp",
    SINGUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    RESETPASSTOKEN_API : BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API : BASE_URL + "/auth/reset-password"
}


export const profileEndpoints = {
    GET_USER_DETAILS_API : BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
}

// TODO :  here path name is missmatching
export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment", 
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail", 
  }

export const courseEndpoints = {

    // all create apis of course route
    CREATE_COURSE_API :  BASE_URL + "/course/createCourse",
    CREATE_SECTION_API : BASE_URL + "/course/addSection",
    CREATE_SUBSECTION_API : BASE_URL + "/course/addSubSection",

    // all update apis of course route
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    UPDATE_SECTION_API : BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API : BASE_URL + "/course/updateSubSection",

    // all delete apis of course route
    DELETE_SECTION_API : BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API : BASE_URL + "/course/deleteSubSection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",

    GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",

    // all categories apis
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",

    // rating
    CREATE_RATING_API: BASE_URL + "/course/createRating",

    }

  // RATINGS AND REVIEWS
export const ratingsEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
}


export const categories = {
    CATAGORIES_API: BASE_URL + "/course/showAllCategories",
};

export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
}


export const settingsEndpoints = {
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
    UPDATE_PROFILE_API : BASE_URL + "/profile/updateProfile",
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
}

// CONTACT-US API  {not created yet}
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
  }


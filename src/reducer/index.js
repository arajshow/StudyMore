import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import courseSlice from "../slices/courseSlice";
import viewCoursesSlice from "../slices/viewCourseSlice"


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    course: courseSlice,
    viewCourse : viewCoursesSlice
})

export default rootReducer
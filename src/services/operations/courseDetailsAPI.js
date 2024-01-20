import {toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { updateCompletedLectures } from "../../slices/viewCourseSlice"
import { courseEndpoints } from "../api"

const {

    // all create apis of course route
    CREATE_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,

    // all update apis of course route
    EDIT_COURSE_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,

    // all delete apis of course route
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,

    GET_ALL_COURSE_API,
    COURSE_DETAILS_API,

    // all categories apis
    COURSE_CATEGORIES_API,

    // rating
    CREATE_RATING_API,

    } = courseEndpoints;

    export const getAllCourses = async () => {
        const toastId = toast.loading("Loading...")
        let result = []
        try{

            const response = await apiConnector("GET", GET_ALL_COURSE_API)

            if(!response?.data?.success){
                throw new Error("Could Not Fetch Courses")
            }

            result = response?.data?.data
        }catch(error){
            console.log("GET_ALL_COURSE_API API ERROR............", error)
            toast.error(error.message)
        }
        toast.dismiss(toastId);
        return result
    }

    export const fetchCourseCategories = async () => {
        let result = []
        try{
            const response = await apiConnector( "GET", COURSE_CATEGORIES_API);
            console.log( "COURSE_CATEGORIES_API response.........", response)

            if(!response?.data?.success){
                throw new Error("Could Not Fetch Course Categories")
            }

            result = response?.data?.Allcategorys
        }catch(error){
            console.log("COURSE_CATEGORIES_API API ERROR............", error)
            toast.error(error.message)
        }

        return result
    }

    export const addCourseDetails = async (data, token) => {
        let result = null
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector( "POST", CREATE_COURSE_API, data, {
                "Content-Type" : "multipart/form-data",
                Authorization: `Bearer ${token}`,
            });
            console.log( "CREATE_COURSE_API response.........", response)

            if(!response?.data?.success){
                throw new Error("Could Not able to Add Course Details")
            }

            toast.success("Course Details Added Successfully")
            result = response?.data?.newCourse

        }catch(error){
            console.log("CREATE_COURSE_API API ERROR............", error)
            toast.error(error.message)
        }
        toast.dismiss(toastId)
        return result
    }

    export const editCourseDetails = async (data, token) => {
        let result = null
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector( "POST", EDIT_COURSE_API, data, {
                "Content-Type" : "multipart/form-data",
                Authorization: `Bearer ${token}`,
            });
            console.log( " EDIT_COURSE_API response.........", response)

            if(!response?.data?.success){
                throw new Error("Could Not able to update Course Details")
            }

            toast.success("Course Details Updated Successfully")
            result = response?.data?.data

        }catch(error){
            console.log(" EDIT_COURSE_API ERROR............", error)
            toast.error(error.message)
        }
        toast.dismiss(toastId)
        return result
    }
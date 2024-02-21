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
    DELETE_COURSE_API,

    GET_ALL_COURSE_API,
    COURSE_DETAILS_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,

    // all categories apis
    COURSE_CATEGORIES_API,

    // rating
    CREATE_RATING_API,

    LECTURE_COMPLETION_API,

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

    export const fetchCourseDetails = async (courseId) => {
        console.log("ayyya mai")
        const toastId = toast.loading("Loading...")
        //   dispatch(setLoading(true));
        let result = null
        try {
            const response = await apiConnector("POST", COURSE_DETAILS_API, {
            courseId,
            })
            console.log("COURSE_DETAILS_API API RESPONSE............", response)

            if (!response.data.success) {
            throw new Error(response.data.message)
            }
            result = response?.data;
        } catch (error) {
            console.log("COURSE_DETAILS_API API ERROR............", error)
            result = error.response.data
            // toast.error(error.response.data.message);
        }
        toast.dismiss(toastId)
        //   dispatch(setLoading(false));
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

            result = response?.data?.data
        }catch(error){
            console.log("COURSE_CATEGORIES_API API ERROR............", error)
            toast.error(error.message)
        }

        return result
    }

    export const fetchInstructorCourses = async (token) => {
        let result = []
        const toastId = toast.loading("loading...");
        try{
            const response = await apiConnector( "GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
                Authorization: `Bearer ${token}`,
            });
            console.log( "GET_ALL_INSTRUCTOR_COURSES_API response.........", response)

            if(!response?.data?.success){
                throw new Error("Could Not Fetch Instructor Courses ")
            }

            result = response?.data?.data
        }catch(error){
            console.log("GET_ALL_INSTRUCTOR_COURSES_API ERROR............", error)
            toast.error(error.message)
        }
        toast.dismiss(toastId)
        return result
    }

    export const getFullDetailsOfCourse = async (courseId, token) => {
        const toastId = toast.loading("Loading...")
        //   dispatch(setLoading(true));
        let result = null
        try {
            const response = await apiConnector(
            "POST",
            GET_FULL_COURSE_DETAILS_AUTHENTICATED,
            {
                courseId,
            },
            {
                Authorization: `Bearer ${token}`,
            }
            )
            console.log("GET_FULL_COURSE_DETAILS_AUTHENTICATED RESPONSE............", response)

            if (!response.data.success) {
            throw new Error(response.data.message)
            }
            result = response?.data?.data
        } catch (error) {
            console.log("GET_FULL_COURSE_DETAILS_AUTHENTICATED ERROR............", error)
            toast.error(error.response?.data?.message);
            result = error.response.data
            // toast.error(error.response.data.message);
        }
        toast.dismiss(toastId)
        //   dispatch(setLoading(false));
        return result
    }

    export const addCourseDetails = async (data, token) => {
        let result = null
        const toastId = toast.loading("Loading...")
        try{
            console.log("data beee", data);
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
            toast.error("Please login and try again")
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

    export const createSection = async (data, token) => {
        let result = null;
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("POST", CREATE_SECTION_API, data, {
                Authorization: `Bearer ${token}`
            })

            console.log( " CREATE_SECTION_API response.........", response)

            if(!response?.data?.success){
                throw new Error("Could Not able to create Section")
            }

            toast.success("Section created Successfully")
            result = response?.data?.data

        }catch(error){
            console.log(" CREATE_SECTION_API ERROR............", error)
            toast.error(error.message)
        }
        toast.dismiss(toastId)
        return result
    }

    export const updateSection = async (data, token) => {
        let result = null;
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
                Authorization: `Bearer ${token}`
            })

            console.log( " UPDATE_SECTION_API response.........", response)

            if(!response?.data?.success){
                throw new Error("Could Not able to update Section")
            }

            toast.success("Section updated Successfully")
            result = response?.data?.data

        }catch(error){
            console.log(" UPDATE_SECTION_API ERROR............", error)
            toast.error(error.message)
        }
        toast.dismiss(toastId)
        return result
    }

    export const createSubSection = async (data, token) => {
        let result = null;
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
                Authorization: `Bearer ${token}`
            })

            console.log( " CREATE_SUBSECTION_APIresponse.........", response)

            if(!response?.data?.success){
                throw new Error("Could Not able to ADD Lecture")
            }

            toast.success("Lecture Added ")
            result = response?.data?.data

        }catch(error){
            console.log(" CREATE_SUBSECTION_API ERROR............", error)
            toast.error(error.message)
        }
        toast.dismiss(toastId)
        return result
    }

    export const updateSubSection = async (data, token) => {
        let result = null;
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
                Authorization: `Bearer ${token}`
            })

            console.log( "UPDATE_SUBSECTION_API response.........", response)

            if(!response?.data?.success){
                throw new Error("Could Not update Lecture")
            }

            toast.success("Lecture Updated ")
            result = response?.data?.data

        }catch(error){
            console.log(" UPDATE_SUBSECTION_API ERROR............", error)
            toast.error(error.message)
        }
        toast.dismiss(toastId)
        return result
    }

    export const deleteSection = async (data, token) => {
        let result = null;
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("POST", DELETE_SECTION_API, data, {
                Authorization: `Bearer ${token}`
            })

            console.log( " DELETE_SECTION_API response.........", response)

            if(!response?.data?.success){
                throw new Error("Could Not able to delete Section")
            }

            toast.success("Section deleted")
            result = response?.data?.data

        }catch(error){
            console.log(" DELETE_SECTION_API ERROR............", error)
            toast.error(error.message)
        }
        toast.dismiss(toastId)
        return result
    }

    export const deleteSubSection = async (data, token) => {
        let result = null;
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
                Authorization: `Bearer ${token}`
            })

            console.log( " DELETE_SUBSECTION_API response.........", response)

            if(!response?.data?.success){
                throw new Error("Could Not able to delete SubSection")
            }

            toast.success("SubSection Deleted!")
            result = response?.data?.data

        }catch(error){
            console.log(" DELETE_SUBSECTION_API ERROR............", error)
            toast.error(error.message)
        }
        toast.dismiss(toastId)
        return result
    }

    export const deleteCourse = async (data, token) => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
            })
            console.log("DELETE COURSE API RESPONSE............", response)
            if (!response?.data?.success) {
            throw new Error("Could Not Delete Course")
            }
            toast.success("Course Deleted")
        } catch (error) {
            console.log("DELETE COURSE API ERROR............", error)
            toast.error(error.message)
        }
        toast.dismiss(toastId)
    }

    // mark a lecture as complete
    export const markLectureAsComplete = async (data, token) => {
        let result = null
        console.log("mark complete data", data)
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
            Authorization: `Bearer ${token}`,
            })
            console.log(
            "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
            response
            )

            if (!response.data.message) {
            throw new Error(response.data.error)
            }
            toast.success("Lecture Completed")
            result = true
        } catch (error) {
            console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
            toast.error(error.message)
            result = false
        }
        toast.dismiss(toastId)
        return result
    }

    // create a rating for course
    export const createRating = async (data, token) => {
        const toastId = toast.loading("Loading...")
        let success = false
        try {
            const response = await apiConnector("POST", CREATE_RATING_API, data, {
            Authorization: `Bearer ${token}`,
            })
            console.log("CREATE RATING API RESPONSE............", response)
            if (!response?.data?.success) {
            throw new Error("Could Not Create Rating")
            }
            toast.success("Rating Created")
            success = true
        } catch (error) {
            success = false
            console.log("CREATE RATING API ERROR............", error)
            toast.error(error.response?.data?.message)
        }
        toast.dismiss(toastId)
        return success
    }

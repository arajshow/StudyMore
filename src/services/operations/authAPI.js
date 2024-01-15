import {toast } from "react-hot-toast"

import {endpoints } from "../api"
import { setLoading, setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"

const {
    SENDOTP_API,
    SINGUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = endpoints


export function sendOtp(email, navigate){

    return async(dispatch) => {
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));

        try{

            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserExist: true, //jarrurat thi kya iski? aisa he code badhane ko likh rakha 
            })

            console.log("SENDOTP API RESPONSE........", response)
            console.log(response.data.success);

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        }catch(error){
            console.log("SENDOTP API ERROR...........", error)
            toast.error("Could Not Send OTP")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){

    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{

            const response = await apiConnector("POST", SINGUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,                
            })

            console.log("SIGNUP API RESPONSE.........", response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Signup Successful");
            navigate("/login")

        }
        catch(error){
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }

        
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email, password, navigate){
    return async (dispatch) => {

        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("POST", LOGIN_API, { email, password});

            console.log("LOGIN API RESPONSE........", response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Login Successful")

            // using setToken reducer to set token in store
            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.image 
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({...response.data.user, image: userImage}))

            // updating localStorage
            localStorage.setItem( "token", JSON.stringify(response.data.token));
            localStorage.setItem( "user", JSON.stringify(response.data.user));

            navigate("/dashboard/my-profile")
        }
        catch(error){
            console.log("LOGIN API ERROR.........", error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}


export function getPasswordResetToken( email, setEmailSent){
    return async (dispatch) => {

        const toastId = toast.loading("Sending...")
        dispatch(setLoading(true));

        try{

            const response = await apiConnector("POST", RESETPASSTOKEN_API, {email});

            console.log("RESET PASSWORD TOKEN RESPONSE.......", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent");

            // this will tell that email is sent and now our ForgetPassword component will switch to 
            // check email formate as everything there depends on emailSent
            setEmailSent(true);
        }catch(error){
            console.log("RESET PASSWORD TOKEN Error......", error);
            toast.error("Failed To send Reset Email");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function resetPassword(password, confirmPassword, token, navigate, setFormData){
    return async (dispatch) => {

        const toastId = toast.loading("loading...")
        dispatch(setLoading(true));

        try{

            if(password!==confirmPassword){
                toast.error("Password do not match");
                dispatch(setLoading(false));
                toast.dismiss(toastId);
                setFormData({
                    password : "",
                    confirmPassword : "",
                })
                return
            }

            const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});

            console.log("RESET PASSWORD RESPONSE.......", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Password Reset Successfully");

            // this will tell that email is sent and now our ForgetPassword component will switch to 
            // check email formate as everything there depends on emailSent
            navigate("/login")
        }catch(error){
            console.log("RESET PASSWORDError......", error);
            toast.error("Failed To Reset Password");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function logout(navigate){
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}
import { toast } from "react-hot-toast"
import { settingsEndpoints } from "../api";
import { apiConnector } from "../apiconnector";
import { setLoading, setUser } from "../../slices/profileSlice";
import { logout} from "./authAPI"

const  {
    DELETE_PROFILE_API,
    UPDATE_PROFILE_API,
    UPDATE_DISPLAY_PICTURE_API,
    CHANGE_PASSWORD_API,
} = settingsEndpoints;


export function updateProfile(token, data){
    return async (dispatch) => {

        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, data, {
            Authorization: `Bearer ${token}`,
        });

            console.log("UPDATE_PROFILE_API API RESPONSE............", response);

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        const userImage = response.data.updatedUserDetails.image
            ? response.data.updatedUserDetails.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
        dispatch(
            setUser({ ...response.data.updatedUserDetails, image: userImage })
        )
        toast.success("Profile Updated Successfully")
        } catch (error) {
        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false));
    }
}


export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false));
  }
}
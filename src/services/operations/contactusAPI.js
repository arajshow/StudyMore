import { toast } from "react-hot-toast"
import { contactusEndpoint } from "../api";
import { apiConnector } from "../apiconnector";

const {CONTACT_US_API} = contactusEndpoint;

export function contactUs(data, setLoading){
    return async () => {
        const toastId = toast.loading("Loading...")

        setLoading(true);
        try {
            // as right now contact api is under-maintanance
            // const response = await apiConnector(
            // "POST",
            // CONTACT_US_API,
            // data
            // );

            // so hard-coded response
            const response = {status:"OK"};
            console.log("Logging response", response);
        } catch (error) {
            console.log("Error: ", error.message);
        }
        setLoading(false);
        toast.dismiss(toastId)
    }
}
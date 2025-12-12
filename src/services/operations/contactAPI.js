import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { contactEndpoints } from "../apis";

const {CONTACT_API} = contactEndpoints;


// function to send user messages to VHerb email address
export async function contactUs(data) {
    const toastId = toast.loading("Sending message...");
    let success = false;

    try {
        const response = await apiConnector("POST", CONTACT_API, data);

        // console.log("CONATACT US API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't send message");
        }

        success = true;
        toast.success("Message sent successfully");
    } catch(err) {
        // console.error("CONTACT US API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);

    return success;
}
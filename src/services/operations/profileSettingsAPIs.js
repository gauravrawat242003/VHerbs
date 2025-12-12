import toast from "react-hot-toast";
import { settingEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../slices/profileSlice";

const {
    CHANGEDISPLAYPICTURE_API,
    DELETEDISPLAYPICTURE_API,
    UPDATEPROFILE_API,
    CHANGEPASSWORD_API,
    DELETEACCOUNT_API,
} = settingEndpoints;


// function to call upload/update profile picture API
export async function updateProfilePicture(token, data, dispatch) {
    const toastId = toast.loading("Uploading image...");
    let result = null;

    try {
        const response = await apiConnector(
            "POST",
            CHANGEDISPLAYPICTURE_API,
            data,
            {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        );

        // console.log("UPDATE PROFILE PICTURE API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't upadte herb");
        }

        result = response?.data?.data;

        // update user in user slice
        dispatch(setUser(result));

        // success toast
        toast.success("Profile picture updated successfully");
    } catch(err) {
        // console.error("UPDATE PROFILE PICTURE API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);
    return result;
}

// function to call delete profile picture API
export async function deleteProfilePicture(token, dispatch) {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector(
            "POST",
            DELETEDISPLAYPICTURE_API,
            {},
            {Authorization: `Bearer ${token}`},
        );

        // console.log("DELETE PROFILE PICTURE API response....", response);

        if(!response?.data?.success) {
            throw new Error("Can't delete account");
        }

        // set user in slice
        dispatch(setUser(response?.data?.data));

        // success toast
        toast.success("Picture deleted successfully");
    } catch(err) {
        // console.error("DELETE PROFILE PICTURE API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);
}

// function to call update profile details API
export async function updateProfileDetails(token, data, dispatch) {
    const toastId = toast.loading("Updating data...");

    try {
        const response = await apiConnector(
            "POST",
            UPDATEPROFILE_API,
            data,
            {Authorization: `Bearer ${token}`},
        );

        // console.log("UPDATE PROFILE DETAILS API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't update profile details");
        }

        // update user in user slice
        dispatch(setUser(response?.data?.data));

        // success toast
        toast.success("Profile updated successfully");
    } catch(err) {
        // console.error("UPDATE PROFILE DETAILS API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);
}

// function to call change password API
export async function changePassword(token, data) {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector(
            "POST",
            CHANGEPASSWORD_API,
            data,
            {Authorization: `Bearer ${token}`},
        );

        // console.log("CHANGE PASSWORD API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't change password");
        }

        result = response?.data?.data;

        // success toast
        toast.success("Password changed successfully");
    } catch(err) {
        // console.error("CHANGE PASSWORD API error...", err);
        toast.error(err?.response?.data?.message || err.message);   
    }

    toast.dismiss(toastId);
    return result;
}

// function to call delete account API
export async function deleteAccount(token) {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector(
            "DELETE",
            DELETEACCOUNT_API,
            {},
            {Authorization: `Bearer ${token}`},
        );

        // console.log("DELETE ACCOUNT API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't delete account");
        }

        result = response?.data?.data;
        toast.success("Account deleted successfully");
    } catch(err) {
        // console.error("DELETE ACCOUNT API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }
    
    toast.dismiss(toastId);
    return result;
}
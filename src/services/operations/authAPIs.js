import toast from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { authEndpoints } from '../apis';
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { setNotes } from "../../slices/noteSlice";
import { setChats } from "../../slices/chatbotSlice";
import { setHerb, setEditHerb } from "../../slices/herbSlice";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSWORDTOKEN_API,
  RESETPASSWORD_API,
} = authEndpoints;


// function to login
export async function login(formData, dispatch) {
    const toastId = toast.loading('Loading...');
    try {
        const response = await apiConnector(
            "POST",
            LOGIN_API,
            formData,
        );

        // console.log("LOGIN API response....", response);
        if(!response?.data?.success) {
            throw new Error("Login failed try again later");
        }

        let user = response.data.user;

        // if any field on user additional details is undefined
        // set them empty string
        if(!user?.additionalDetails?.about) {
            user.additionalDetails.about = "";
        }
        if(!user?.additionalDetails?.contactNumber) {
            user.additionalDetails.contactNumber = "";
        }
        if(!user?.additionalDetails?.dateOfBirth) {
            user.additionalDetails.dateOfBirth = "";
        }
        if(!user?.additionalDetails?.gender) {
            user.additionalDetails.gender = "";
        }

        // if use has clicked remember me during login 
        // then save token to local storage
        // other wise save to session storage
        if(formData.rememberLogin) {
            localStorage.setItem('token', JSON.stringify(response.data.token));
        } else {
            sessionStorage.setItem('token', JSON.stringify(response.data.token));
        }
        
        // save user data to local storage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // save notes in local storage
        localStorage.setItem('notes', JSON.stringify(response.data.user.notes));

        // save details in redux store
        dispatch(setToken(response.data.token));
        dispatch(setUser(response.data.user));
        dispatch(setNotes(response.data.user.notes));

        toast.success("Login successfull");
    } catch(err) {
        // console.error("LOGIN API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);
}


// function to send otp
export async function sendOtp(formData) {
    const toastId = toast.loading("Loading...");
    let success = false;

    try {
        const response = await apiConnector(
            "POST",
            SENDOTP_API,
            formData
        );

        if(!response?.data?.success) {
            throw new Error("Can't send otp!");
        }

        // console.log("SEND OTP API response...", response);

        success = true;
    } catch(err) {
        // console.error("SEND OTP API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);

    return success;
}


// function to sign-up
export async function signup(formData, navigate) {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector(
            "POST",
            SIGNUP_API,
            formData,
        );

        // console.log("SIGNUP API response...", response);
        if(!response?.data?.success) {
            throw new Error("Can't signup");
        }

        toast.dismiss(toastId);
        toast.success("Account created successully");

        // navigate to login route
        navigate('/login');
    } catch(err) {
        toast.dismiss(toastId);
        // console.error("SIGNUP API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }
}


// function to logout
export function logout(dispatch, navigate) {
    try {
        // reset data in redux store
        dispatch(setToken(""));
        dispatch(setUser(""));
        dispatch(setNotes(""));
        dispatch(setChats(""));
        dispatch(setHerb(null));
        dispatch(setEditHerb(false));

        // clear data from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('notes');
        localStorage.removeItem('chats');

        // success toast
        toast.success("Logout successfull");

        // navigate to login page
        navigate("/login");
    } catch(err) {
        // console.error("LOGOUT error...", err);
        toast.error(err.message);
    }
}


// function to send reset password email
export async function resetPasswordToken(email) {
    const toastId = toast.loading("Loading...");
    let success = false;

    try {
        const response = await apiConnector(
            "POST",
            RESETPASSWORDTOKEN_API,
            {email},
        );

        // console.log("RESET PASSWORD TOKEN API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't send reset password email");
        }

        success = true;
        toast.success("Password reset email sent successfully");
    } catch(err) {
        // console.error("RESET PASSWORD TOKEN API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);
    return success;
}


// function to reset password
export async function resetPassword(formData) {
    const toastId = toast.loading("Loading...");
    let success = false;

    try {
        const response = await apiConnector(
            "POST",
            RESETPASSWORD_API,
            formData,
        );

        // console.log("RESET PASSWORD API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't reset password");
        }

        success = true;
        toast.success("Password reset successfully");        
    } catch(err) {
        // console.error("RESET PASSWORD API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);

    return success;
}
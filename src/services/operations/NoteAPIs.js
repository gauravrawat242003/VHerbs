import toast from "react-hot-toast";

import { noteEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setNotes } from "../../slices/noteSlice";

const {
    CREATENOTE_API,
    UPDATENOTE_API,
    DELETENOTE_API,
    GETUSERNOTES_API
} = noteEndpoints


// function to create a notes
export async function createNote(data, token, dispatch) {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector(
            "POST",
            CREATENOTE_API,
            data,
            {Authorization: `Bearer ${token}`}
        );

        // console.log("CREATE NOTE API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't create note");
        }

        // set notes        
        dispatch(setNotes(response?.data?.data?.userNotes));
        
        result = response?.data?.data?.createdNote;

        // success toast
        toast.success("Note saved successfully");
    } catch(err) {
        // console.error("CREATE NOTE API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);

    return result;
}


// function to update a note
export async function updateNote(data, token, dispatch) {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector(
            "POST",
            UPDATENOTE_API,
            data,
            {Authorization: `Bearer ${token}`}
        );

        // console.log("UPDATE NOTE API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't update note");
        }

        // set notes 
        dispatch(setNotes(response?.data?.data?.userNotes));
        
        result = response?.data?.data?.noteDetails;

        // success toast
        toast.success("Note saved successfully");
    } catch(err) {
        // console.error("UPDATE NOTE API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);

    return result;
}


// function to delete a note
export async function deleteNote(data, token, dispatch) {
    const toastId = toast.loading("Loading...");
    let result = [];

    try {
        const response = await apiConnector(
            "DELETE",
            DELETENOTE_API,
            data,
            {Authorization: `Bearer ${token}`}
        );

        // console.log("DELETE NOTE API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't update note");
        }

        // set notes 
        dispatch(setNotes(response?.data?.data));
        
        result = response?.data?.data;

        // success toast
        toast.success("Note deleted successfully");
    } catch(err) {
        // console.error("DELETE NOTE API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);

    return result;
}


// function to get all user notes
export async function getUserNotes(token) {
    let result = [];

    try {
        const response = await apiConnector(
            "GET",
            GETUSERNOTES_API,
            {},
            {Authorization: `Bearer ${token}`},
        );

        // console.log("GET USER NOTES API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't get user notes");
        }

        result = response?.data?.data;
    } catch(err) {
        // console.error("GET USER NOTES API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    return result;
}
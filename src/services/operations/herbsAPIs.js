import toast from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { herbEndpoints } from "../apis";

import { setUser } from '../../slices/profileSlice';

const {
    GETALLHERBS_API,
    GETPUBLISHEDHERBS_API,
    GETHERBDETAILS_API,
    CREATEHERB_API,
    CREATEHERBMEDIA_API,
    EDITHERB_API,
    DELETEHERB_API,
    BOOKMARK_API,
    REMOVEBOOKMARK_API,
    GETBOOKMARKHERBS_API,
    LIKEHERB_API,
    UNLIKEHERB_API,
} = herbEndpoints;


// function to get all herbs for admin dashboard
export async function getAllHerbs(token) {
    let result = [];
    
    try {
        const response = await apiConnector("GET", GETALLHERBS_API, {}, {Authorization: `Bearer ${token}`});

        if(!response?.data?.success) {
            throw new Error("Can't fetch herbs");
        }

        // console.log("GET ALL HERBS API response...", response);

        // set result
        result = response.data.data;
    } catch(err) {
        // console.error("GET ALL HERBS API ERROR...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    return result;
}


// function to get all pubhlished herbs for explore herbs page
export async function getPublishedHerbs() {
    let result = [];

    try {
        const response = await apiConnector("GET", GETPUBLISHEDHERBS_API);

        if(!response?.data?.success) {
            throw new Error("Can't fetch herbs");
        }

        // console.log("GET PUBLISHED HERBS API response...", response);

        // set result
        result = response.data.data;
    } catch(err) {
        // console.error("GET PUBLISHED HERBS API ERROR...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    return result;
}


// function to create herb
export async function createHerb(token, data) {
const toastId = toast.loading("Creating data...");
let result = null;

try {
    const response = await apiConnector(
        "POST",
        CREATEHERB_API,
        data,
        {Authorization: `Bearer ${token}`}
    );

    // console.log("CREATE HERB API response...", response);

    if(!response?.data?.success) {
        throw new Error("Can't create herb");
    }

    result = response.data.data;

    toast.success("Herb created successfully");
} catch(err) {
    // console.error("CREATE HERB API error...", err);
    toast.error(err?.response?.data?.message || err.message);
}

toast.dismiss(toastId);
return result;
}


// function to upload herb media
export async function uploadHerbMedia(data, token) {
    const toastId = toast.loading("Uploading...");
    let result = null;

    try {
        const response = await apiConnector(
            "POST",
            CREATEHERBMEDIA_API,
            data,
            {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        );

        // console.log("UPLOAD HERB MEDIA API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't upload herb media");
        }


        result = response.data.data;
        toast.success("Herb media uploaded successfully");
    } catch(err) {
        // console.error("UPLOAD HERB MEDIA API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);
    return result;
}


// function to update herb details
export async function updateHerb(token, data) {
    const toastId = toast.loading("Updating data...");
    let result = null;
    try {
        const response = await apiConnector(
            "PUT",
            EDITHERB_API,
            data,
            {Authorization: `Bearer ${token}`}
        );

        // console.log("UPDATE HERB API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't upadte herb");
        }

        result = response.data.data;

        toast.success("Herb updated successfully");
    } catch(err) {
        // console.error("UPDATE HERB API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);
    return result;
}


// function to delete herb
export async function deleteHerb(token, herbId) {
    const toastId = toast.loading("Deleting data...");
    let success = false;

    try {
        const response = await apiConnector(
            "DELETE",
            DELETEHERB_API,
            {herbId},
            {Authorization: `Bearer ${token}`}
        );

        // console.log("DELETE HERB API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't delete herb");
        }

        success = true;
        toast.success("Herb deleted successfully");
    } catch(err) {
        // console.error("DELETE HERB API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);

    return success;
}


// function to get details of a specific herb
export async function getHerbDetails(herbId) {
    let result = null;

    try {
        // sending herbId in query parameters
        const response = await apiConnector(
            "GET",
            GETHERBDETAILS_API,
            {},
            {},
            {herbId}
        );

        // console.log("GET HERB DETAILS API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't fetch herb details");
        }

        result = response.data.data;
    } catch(err) {
        // console.error("GET HERB DETAILS API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    return result;
}


// function to bookmark herb
export async function bookmarkHerb(herbId, token, dispatch) {
    const toastId = toast.loading("Loading...");
    let success = false;

    try {
        const response = await apiConnector(
            "POST",
            BOOKMARK_API,
            {herbId},
            {Authorization: `Bearer ${token}`},
        );

        // console.log("BOOKMARK HERB API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't bookmark herb");
        }

        // set user
        dispatch(setUser(response.data.data));

        // set success as true
        success = true;

        toast.success("Herb added to bookmarks");
    } catch(err) {
        // console.error("BOOKMARK HERB API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);

    return success;
}


// function to remove bookmarked herb
export async function removeBookmarkHerb(herbId, token, dispatch) {
    const toastId = toast.loading("Loading...");
    let success = false;

    try {
        const response = await apiConnector(
            "POST",
            REMOVEBOOKMARK_API,
            {herbId},
            {Authorization: `Bearer ${token}`},
        );

        // console.log("REMOVE BOOKMARK HERB API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't remove herb from bookmarks");
        }

        // set user
        dispatch(setUser(response.data.data));

        // mark success as true
        success = true;
        
        toast.success("Herb removed from bookmarks");
    } catch(err) {
        // console.error("REMOVE BOOKMARK HERB API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);

    return success;
}


// function to get all bookmarked herbs
export async function getBookmarkedHerbs(token) {
    let result = [];

    try {
        const response = await apiConnector(
            "POST",
            GETBOOKMARKHERBS_API,
            {},
            {Authorization: `Bearer ${token}`},
        );

        // console.log("GET BOOKMARKED HERBS API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't fetch bookmarked herbs");
        }

        result = response?.data?.data;
    } catch(err) {
        // console.error("GET BOOKMARKED HERBS API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    return result;
}


// function to like a herb
export async function likeHerb(token, herbId, dispatch) {
    const toastId = toast.loading("Loading...");
    let success = false;

    try {
        const response = await apiConnector(
            "POST",
            LIKEHERB_API,
            {herbId},
            {Authorization: `Bearer ${token}`},
        );

        // console.log("LIKE HERB API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't like herb");
        }

        // set user
        dispatch(setUser(response.data.data));

        success = true;
        toast.success("Herb Liked successfully");
    } catch(err) {
        // console.error("LIKE HERB HERB API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);
    return success;
}


// function to unlike a herb
export async function unlikeHerb(token, herbId, dispatch) {
    const toastId = toast.loading("Loading...");
    let success = false;

    try {
        const response = await apiConnector(
            "POST",
            UNLIKEHERB_API,
            {herbId},
            {Authorization: `Bearer ${token}`},
        );

        // console.log("UNLIKE HERB API response...", response);

        if(!response?.data?.success) {
            throw new Error("Can't unlike herb");
        }

        // set user
        dispatch(setUser(response.data.data));

        success = true;
        toast.success("Herb Unliked successfully");
    } catch(err) {
        // console.error("UNLIKE HERB HERB API error...", err);
        toast.error(err?.response?.data?.message || err.message);
    }

    toast.dismiss(toastId);
    return success;
}
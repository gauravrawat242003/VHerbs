const Profile = require('../models/Profile');
const User = require('../models/User');
const deleteFromCloudinary = require('../utils/fileDelete');

const uploadFileToCloudinary = require('../utils/fileUploader');
require('dotenv').config();

// controller for updating profile picture 
exports.updateDisplayPicture = async (req, res) => {
    try {
        // fetch data
        const image = req.files.image;
        const userId = req.user.id;

        // validate data
        if(!image || !userId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // update user profile
        const userDetails = await User.findById(userId);

        // delete previous profile image
        const profileDetails = await Profile.findById(userDetails.additionalDetails);
        if(profileDetails.image) {
            const response = await deleteFromCloudinary(profileDetails.image, 'image', process.env.FOLDER_NAME);
            console.log("Old profile picture deleted...", response);
        }

        // upload image 
        const response = await uploadFileToCloudinary(
            image,
            process.env.FOLDER_NAME,
            1000,
            100
        );

        console.log("photo uploaded to cloudinary...", response);

        // update profile details
        await Profile.findByIdAndUpdate(
            userDetails.additionalDetails,
            {image: response.secure_url},
            {new: true}
        );

        // get updated user details
        const updatedUserDetails = await User.findById(userId).populate('additionalDetails');

        return res.status(200).json({
            success: true,
            message: "Image uploaded to cloudninary",
            data: updatedUserDetails,
        });
    } catch(err) {
        console.error("UPDATE DISPLAY PICTURE API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

// controller for deleting profile picture
exports.deleteDisplayPicture = async (req, res) => {
    try {
        const userId = req.user.id;

        // get user image
        const userDetails = await User.findById(userId);
        const profileDetails = await Profile.findById(userDetails.additionalDetails);

        const response = await deleteFromCloudinary(profileDetails.image, 'image', process.env.FOLDER_NAME);
        console.log("Old profile picture deleted...", response);

        // update profile details
        profileDetails.image = "";
        await profileDetails.save();

        // get updated user details
        const updatedUserDetails = await User.findById(userId).populate('additionalDetails');

        // return success response
        return res.status(200).json({
            success: true,
            message: "Image uploaded to cloudninary",
            data: updatedUserDetails,
        })

    } catch(err) {
        console.error("DELETE DISPLAY PICTURE API BACKEND error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

// controller for updating profile details
exports.updateProfile = async (req, res) => {
    try {
        // fetch data
        const {
            firstName="",
            lastName="",
            gender="",
            dateOfBirth="",
            contactNumber="",
            about=""
        } = req.body;

        const userId = req.user.id;

        // find the user and profile
        const user = await User.findById(userId);
        const profile = await Profile.findById(user.additionalDetails);

        // update user details
        user.firstName = firstName;
        user.lastName = lastName;


        // update profile details
        profile.gender = gender;
        profile.dateOfBirth = dateOfBirth;
        profile.contactNumber = contactNumber;
        profile.about = about;

        // save document
        await user.save();
        await profile.save();

        // get updated user details
        const updatedUserDetails = await User.findById(userId).populate('additionalDetails');

        // return success response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUserDetails
        });
    } catch(err) {
        console.error("UPDATE PROFILE API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}
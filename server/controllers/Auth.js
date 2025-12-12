const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require("../models/User");
const OTP = require('../models/OTP');
const Profile = require('../models/Profile');
const mailSender = require('../utils/mailSender');
const deleteFromCloudinary = require('../utils/fileDelete');


// controller for sending otp
exports.sendOtp = async (req, res) => {
    try {
        // fetch data
        const {email} = req.body;

        // validate data
        if(!email) {
            return res.status(400).json({
                success: false,
                message: "All fileds are required",
            });
        }

        // check if user already present
        const user = await User.findOne({email});

        if(user) {
            return res.status(409).json({
                success: false,
                message: "Email already registered",
            });
        }

        // generate otp
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // generate unique otp
        let otpPresent = await OTP.findOne({otp:otp});
        while(otpPresent) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            otpPresent = await OTP.findOne({otp:otp});
        }


        // save otp in db
        const otpDetails = await OTP.create({email, otp});

        // return success response
        return res.status(200).json({
            success: true,
            message: 'OTP send successfully',
            data: otpDetails,
        });
    } catch(err) {
        console.log("SEND OTP API ERROR...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

// controller for registering user
exports.signup = async (req, res) => {
    try {
        // fetch data
        const {
            email,
            password,
            confirmPassword,
            firstName,
            lastName="",
            accountType,
            otp,
        } = req.body;

        // validate data
        if(!email || !password || !confirmPassword || !firstName || !accountType || !otp) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // match password
        if(password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Both password must be same",
            });
        }

        // check if user already exists
        const userPresent = await User.findOne({email});
        if(userPresent) {
            return res.status(409).json({
                success: false,
                message: "User alreay registered",
            });
        }

        // get the otp from db
        const otpDetails = await OTP.find({email}).sort({createdAt:-1}).limit(1); // get most recent otp

        if(!otpDetails || otpDetails.length === 0) {
            return res.status(404).json({
                success: false,
                message: "OTP not found for this email",
            });
        }

        // compare otp
        if(otpDetails[0].otp !== otp) {
            return res.status(401).json({
                success: false,
                messsage: "OTP is incorrect",
            });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create additional details for user
        const profileDetails = await Profile.create({
            gender: "",
            dataOfBirth: "",
            contactNumber: "",
            about: "",
            image: "",
        });
        
        // create user
        const userDetails = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            accountType,
            additionalDetails: profileDetails._id,
        });

        // return success response
        return res.status(200).json({
            success: true,
            message: "User created successfully",
            data: userDetails,
        });
    } catch(err) {
        console.log("SIGN UP API error...", err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
}

// controller for login user
exports.login = async (req, res) => {
    try {
        // fetch data
        const {email, password} = req.body;

        // validate data
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fileds are required",
            });
        }
        
        // search user
        const user = await User.findOne({email})
            .populate('additionalDetails')
            .populate({
                path: 'notes',
                populate: {
                    path: 'herb',
                }
            });

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "Email is not registered",
            });
        }

        // compare password
        if(await bcrypt.compare(password, user.password)) {
            // create JWT token
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            };
            const tokenOptions = {
                expiresIn: "3d",
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, tokenOptions);

            // save token in user object
            user.token = token;
            // hide the password
            user.password = undefined;

            // create otptions for cookie
            const cookieOptions = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
                httpOnly: true,
            }

            // set cookie for token & send response
            res.cookie("token", token, cookieOptions).status(200).json({
                success: true,
                token, 
                user,
                message: "Login successful",
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }
        
    } catch(err) {
        console.log("LOGIN API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

// controller for changing password
exports.changePassword = async (req, res) => {
    try {
        // fetch data
        const userId = req.user.id;
        const {oldPassword, newPassword} = req.body;

        // validate data
        if(!userId || !oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const userDetails = await User.findById(userId);

        // verify password
        if(await bcrypt.compare(oldPassword, userDetails.password)) {
            // hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            const updatedUserDetails = await User.findByIdAndUpdate(
                userId,
                {password: hashedPassword},
                {new: true},
            );

            // send password change email to user
            await mailSender(
                updatedUserDetails.email, 
                "Password change",
                "You password has been changed successfully",
            );

            // return success response
            return res.status(200).json({
                success: true,
                message: "Password changed successfully",
                data: updatedUserDetails,
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect",
            })
        }

    } catch(err) {
        console.log("CHANGE PASSOWORD API error...", err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
}

// controller to delete user account
exports.deleteAccount = async (req, res) => {
    try {
        // fetch data
        const userId = req.user.id;

        // search user
        const user = await User.findById(userId);

        // delete user profile data from db
        const userProfile = await Profile.findById(user.additionalDetails);

        // delete profile picture from cloudinary
        if(userProfile.image) {
            await deleteFromCloudinary(userProfile.image, 'image', process.env.FOLDER_NAME);
        }

        // delete user profile from db 
        await Profile.findByIdAndDelete(user.additionalDetails);

        // delete user from db
        const deletedUser = await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
            data: deletedUser,
        });
    } catch(err) {
        console.error("DELETE ACCOUNT API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}
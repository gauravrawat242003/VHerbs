const crypto = require('crypto');
const bcrypt = require('bcrypt');

const User = require("../models/User");
const mailSender = require('../utils/mailSender');

// controller to send password reset link to user
exports.resetPasswordToken = async (req, res) => {
    try {
        // fetch data
        const {email} = req.body;

        // validate data
        if(!email) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // find user with registered email
        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "This email is not registered with us",
            });
        }

        // generate a token
        const token = crypto.randomBytes(20).toString("hex");

        // add token to user in db
        await User.findOneAndUpdate(
            {email: email},
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000, // 5 minutes
            },
            {new: true},
        );

        // send email with reset password link
        const url = `https://vherbs.vercel.app/reset-password/${token}`;
        await mailSender(
            email,
            "Password reset link",
            `<p>Click the link to reset your password: <strong>${url}</strong></p>
            <p>This link will expire in 5 minutes</p>`
        );
        
        // return success response
        return res.status(200).json({
            success: true,
            message: "Password reset email sent successfully",
        });
    } catch(err) {
        console.error("RESET PASSWORD TOKEN API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

// controller to reset password
exports.resetPassword = async (req, res) => {
    try {
        // fetch data
        const {password, confirmPassword, token} = req.body;

        // validate data
        if(!password || !confirmPassword || !token) {
            return res.status(400).json({
                success: false,
                message: "All fileds are required",
            });
        }

        // check if passwords are matching
        if(password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Both passwords must be same",
            });
        }

        // validate user
        const userDetails = await User.findOne({token: token});

        if(!userDetails) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }

        // check if password reset link is valid
        if(userDetails.resetPasswordExpires < Date.now()) {
            return res.status(401).json({
                success: false,
                message: "This link has expired",
            });
        }

        // hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // update password in db 
        // remove password reset token so he can't update more than 1 time using 1 link
        await User.findByIdAndUpdate(
            userDetails._id,
            {
                password: hashedPassword,
                token: '',
            },
        );

        // return success response
        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    } catch(err) {
        console.error("RESET PASSWORD API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
require('dotenv').config();

// controller to send user message to VHerb email
exports.contact = async (req, res) => {
    try {
        const {firstName, lastName, email, message} = req.body;

        if(!firstName || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // mail user message to VHerbs mail
        await mailSender(
            process.env.MAIL_USER, 
            "VHerb contact us mail", 
            `
                <p>Name: ${firstName}${lastName ? lastName : ''}</p>
                <p>email: ${email}</p>
                <p>message: ${message}</p>
            `
        );

        // send confirmatin mail to user
        await mailSender(
            email,
            "Message successfull",
            "Your message has been delievered successfully, We will reach out you soon"
        );

        return res.status(200).json({
            success: true,
            message: "message delievered successfully",
        });
    } catch(err) {
        console.error("CONTACT API error...",err);
        res.status(501).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}
const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60*5, // auto delete after 5 minutes
    },
});

// send mail before saving entry in db
otpSchema.pre('save', async function(next) {
    if(this.isNew) {
        await mailSender(
            this.email, 
            "Verification email", 
            `<p>OTP is: <strong>${this.otp}</strong></p>`
        );
    }

    next();
});

module.exports = mongoose.model("OTP", otpSchema);
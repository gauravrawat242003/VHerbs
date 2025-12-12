const express = require('express');
const router = express.Router();

// import controllers
const {
    sendOtp,
    signup,
    login,
    changePassword,
    deleteAccount
} = require('../controllers/Auth');

const {
    resetPasswordToken,
    resetPassword
} = require('../controllers/ResetPassword');


// import middlewares
const {auth} = require('../middlewares/auth');


// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// route to send otp
router.post('/sendotp', sendOtp);

// route to signup
router.post('/signup', signup);

// route to login
router.post('/login', login);

// route to change password
router.post('/change-password', auth, changePassword);

// route to delete account
router.delete('/delete-account', auth, deleteAccount);


// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// route to generate password reset link
router.post('/reset-password-token', resetPasswordToken);

// router to reset password
router.post('/reset-password', resetPassword)


module.exports = router;
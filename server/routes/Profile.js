const express = require('express');
const router = express.Router();

// import controllers
const {
    updateDisplayPicture,
    deleteDisplayPicture,
    updateProfile,
} = require('../controllers/Profile');

// import middlewares
const {auth} = require('../middlewares/auth');


// route to change display picture
router.post('/display-picture/change', auth, updateDisplayPicture);

// route to delete display picture
router.post('/display-picture/delete', auth, deleteDisplayPicture);

// route to update profile details
router.post('/update-profile', auth, updateProfile);

module.exports = router;
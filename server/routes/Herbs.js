const express = require('express');
const router = express.Router();

// importing middlewares
const {auth, isAdmin, isUser} = require('../middlewares/auth');

// importing controllers
const {
    createHerb,
    editHerb,
    deleteHerb,
    getHerbDetails,
    getAllHerbs,
    createHerbMedia,
    getPublishedHerbs,
    addBookmark,
    removeBookmark,
    getBookmarkedHerbs,
    likeHerb,
    unlikeHerb,
} = require('../controllers/Herb');


// route to get a specific herb
router.get('/get-herb-details', getHerbDetails);

// route to get only published herbs
router.get('/get-published-herbs', getPublishedHerbs);



// ********************************************************************************************************
//                                          User routes
// ********************************************************************************************************

// route to bookmark herb
router.post('/bookmark/add', auth, isUser, addBookmark);

// route to remove bookmarked herb
router.post('/bookmark/remove', auth, isUser, removeBookmark);

// route to get all bookmarked herbs
router.post('/bookmark/get', auth, isUser, getBookmarkedHerbs);

// route to like a herb
router.post('/like', auth, isUser, likeHerb);

// route to unlike a herb
router.post('/unlike', auth, isUser, unlikeHerb);



// ********************************************************************************************************
//                                          Admin routes
// ********************************************************************************************************

// route to get all herbs
router.get('/get-all-herbs', auth, isAdmin, getAllHerbs);

// route for creating herb
router.post('/create-herb', auth, isAdmin, createHerb);

// route for adding media (image, video, model) to herb
router.post('/create-herb-media', auth, isAdmin, createHerbMedia);

// route for editing herb details
router.put('/edit-herb', auth, isAdmin, editHerb);

//route to delete a herb
router.delete('/delete-herb', auth, isAdmin, deleteHerb); 


// export router
module.exports = router;
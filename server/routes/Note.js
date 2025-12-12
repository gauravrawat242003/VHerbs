const express = require('express');
const router = express.Router();

// import controllers
const {
    createNote,
    editNote,
    deleteNote,
    getUserNotes
} = require('../controllers/Note');

// import middlewares
const { auth, isUser } = require('../middlewares/auth');


// route for creating note
router.post('/create-note', auth, isUser, createNote);

// route to update note
router.post('/update-note', auth, isUser, editNote);

// route to delet note
router.delete('/delete-note', auth, isUser, deleteNote);

// route to get all notes of an user
router.get('/get-user-notes', auth, isUser, getUserNotes);


// export routes
module.exports = router;
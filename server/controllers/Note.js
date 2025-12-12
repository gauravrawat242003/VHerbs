const Note = require('../models/Note');
const Herb = require('../models/Herb');
const User = require('../models/User');

// controller to create a note
exports.createNote = async (req, res) => {
    try {
        // fetch data
        const {herbId, textContent} = req.body;
        const userId = req.user.id;

        // validate data
        if(!herbId || !userId || !textContent) {
            return res.status(400).json({
                success: false,
                message: "All filelds are required",
            });
        }

        // check if herb present
        const herbDetails = await Herb.findById(herbId);
        if(!herbDetails) {
            return res.status(404).json({
                success: false,
                message: `No herb found with id: ${herbId}`,
            });
        }

        // create a note
        const createdNote = await Note.create({
            herb: herbId,
            textContent,
            user: userId
        });

        // push note to user document
        await User.findByIdAndUpdate(
            userId,
            {$push: {notes:createdNote._id}}
        );

        
        // get updated user details
        const updatedUser = await User.findById(userId)
            .populate({
                path: 'notes',
                populate: {
                    path: 'herb',
                }
            }).exec();

        // get all notes of user
        const userNotes = updatedUser.notes;

        // return success response
        return res.status(200).json({
            success: true,
            message: "Note created successfully",
            data: {userNotes, createdNote},
        });
    } catch(err) {
        console.error("CREATE NOTE API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

// controller to edit note
exports.editNote = async (req, res) => {
    try {
        // fetch data
        const {noteId, textContent} = req.body;
        const userId = req.user.id;

        // validate data
        if(!noteId || !textContent) {
            return res.status(400).json({
                success: false,
                message: "All fileds are required",
            });
        }

        // find and update note
        const noteDetails = await Note.findOneAndUpdate(
            {_id: noteId}, 
            {textContent: textContent},
            {new: true}
        ).exec();

        if(!noteDetails) {
            return res.status(404).json({
                success: false,
                message: `Note with id: ${noteId} not found`,
            });
        }
        
        // get updated user details
        const updatedUser = await User.findById(userId)
            .populate({
                path: 'notes',
                populate: {
                    path: 'herb',
                }
            }).exec();

        // get all notes of user
        const userNotes = updatedUser.notes;

        // return success response
        return res.status(200).json({
            success: true,
            message: "Note updated successfully",
            data: {userNotes, noteDetails},
        });
    } catch(err) {
        console.error("EDIT NOTE API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

// controller to delete note
exports.deleteNote = async (req, res) => {
    try {
        // fetch data
        const {noteId} = req.body;
        const userId = req.user.id;

        // validate data
        if(!noteId) {
            return res.status(400).json({
                success: false,
                message: "Note ID is required",
            });
        }

        // find note and delete
        const deletedNote = await Note.findByIdAndDelete(noteId);

        if(!deletedNote) {
            return res.status(404).json({
                success: false,
                message: `Note with id: ${noteId} is not found`,
            });
        }

        // remove note from user document
        await User.findByIdAndUpdate(
            userId,
            {$pull: {notes:deletedNote._id}},
        ).exec();

        // get updated user notes
        const updatedUserDetails = await User.findById(userId)
            .populate({
                path: 'notes',
                populate: {
                    path: 'herb',
                }
            }).exec();

        // get all notes of user
        const userNotes = updatedUserDetails.notes;

        // return success response
        return res.status(200).json({
            success: true,
            message: "Note deleted successfully",
            data: userNotes,
        });
    } catch(err) {
        console.error("DELETE NOTE API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

// controller to get all notes of user
exports.getUserNotes = async (req, res) => {
    try {
        // fetch data
        const userId = req.user.id;
        
        // get all notes
        const userNotes = await Note.find({user:userId}).populate('herb').exec();

        // return success response
        return res.status(200).json({
            success: true,
            message: "User notes fetched successfully",
            data: userNotes,
        });
    } catch(err) {
        console.error("DELETE NOTE API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}
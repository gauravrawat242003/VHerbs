const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
    {
        textContent: {
            type: String,
            required: true,
        },
        herb: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Herb',
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
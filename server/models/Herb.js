const mongoose = require('mongoose');

const herbSchema = new mongoose.Schema({
    commonName: {
        type: String,
        required: true,
    },
    botanicalName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    fullDescription: {
        type: String,
        required: true,
    },
    partsUsed: {
        type: String,
        required: true,
    },
    uses: {
        type: String,
        required: true,
    },
    regions: {
        type: String,
        required: true,
    },
    cultivation: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },
    model: {
        type: String,
    },
    status: {
        type: String,
        enum: ["draft", "published"],
        required: true,
    },
    // for number of bookmarks
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    // for number of likes
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
});

module.exports = mongoose.model("Herb", herbSchema);
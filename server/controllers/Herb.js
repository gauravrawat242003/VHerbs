const Herb = require('../models/Herb');
const User = require('../models/User');

const deleteFromCloudinary = require('../utils/fileDelete');
const uploadFileToCloudinary = require('../utils/fileUploader');

require('dotenv').config();

// controller to create a herb
exports.createHerb = async (req, res) => {
    try {
        // fetch data
        const {
            commonName,
            botanicalName,
            category,
            shortDescription,
            fullDescription,
            regions,
            partsUsed,
            uses,
            cultivation
        } = req.body;

        // validate data
        if(!commonName ||
            !botanicalName ||
            !category ||
            !shortDescription ||
            !fullDescription ||
            !regions ||
            !partsUsed ||
            !uses ||
            !cultivation
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        // status of herb
        let {status} = req.body;
        if(!status || status === undefined) {
            status = "draft";
        }

        // create herb
        const herb = await Herb.create({
            commonName,
            botanicalName,
            category,
            shortDescription,
            fullDescription,
            regions,
            partsUsed,
            uses,
            cultivation,
            status
        });

        // return success response
        return res.status(200).json({
            success: true,
            message: "Herb created successfully",
            data: herb
        });
    } catch(err) {
        console.error("CREATE HERB API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}

// controller to add media to herb
exports.createHerbMedia = async (req, res) => {
    try {
        // fetch data
        const {herbId} = req.body;
        const image = req.files.image;
        const video = req.files?.video || "";
        const model = req.files?.model || "";

        // validate data
        if(!herbId || !image) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // upload image to cloudinary
        let imageResponse = {};
        if(image) {
            imageResponse = await uploadFileToCloudinary(image, process.env.FOLDER_NAME, 1000, 100);
            // console.log("uploaded image:", imageResponse);
        }

        // upload video to cloudinary
        let videoResponse = {};
        if(video) {
            videoResponse = await uploadFileToCloudinary(video, process.env.FOLDER_NAME);
        }

        // upload model to cloudinary
        let modelResponse = {};
        if(model) {
            modelResponse = await uploadFileToCloudinary(model, process.env.FOLDER_NAME);
        }

        // add media to the herb
        const herbDetails = await Herb.findByIdAndUpdate(
            herbId,
            {
                image: imageResponse.secure_url || "",
                video: videoResponse?.secure_url || "",
                model: modelResponse?.secure_url || ""
            },
            {new: true}
        );

        // return success response
        return res.status(200).json({
            success: true,
            message: "Herbs media created successfully",
            data: herbDetails
        });
    } catch(err) {
        console.error("CREATE HERB MEDIA API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}

// controller to edit/update herb details
exports.editHerb = async (req, res) => {
    try {
        // fetch data
        const {
            herbId,
            commonName,
            botanicalName,
            category,
            shortDescription,
            fullDescription,
            regions,
            partsUsed,
            uses,
            cultivation,
            status
        } = req.body;

        // search herb
        const herb = await Herb.findById(herbId);

        if(!herb) {
            return res.status(404).json({
                success: false,
                message: `Herb with id: ${herbId} not found`,
            });
        }

        // update the provided fields
        if(commonName)  herb.commonName = commonName;
        if(botanicalName)   herb.botanicalName = botanicalName;
        if(category) herb.category = category;
        if(shortDescription)    herb.shortDescription = shortDescription;
        if(fullDescription) herb.fullDescription = fullDescription;
        if(regions) herb.regions = regions;
        if(partsUsed)   herb.partsUsed = partsUsed;
        if(uses) herb.uses = uses;
        if(cultivation) herb.cultivation = cultivation;
        if(status) herb.status = status;  

        // check for image
        if(req.files && req.files.image) {
            // delete previous image from cloudinary
            if(herb.image) {
                const response = await deleteFromCloudinary(herb.image, 'image', process.env.FOLDER_NAME);
                console.log("Herb photo deleted...", response);
            } 

            // upload new image to cloudinary
            const image = req.files.image;
            const imageResponse = await uploadFileToCloudinary(image, process.env.FOLDER_NAME, 1000, 100);
            herb.image = imageResponse.secure_url;
        }

        // check for video
        if(req.files && req.files.video) {
            // delete previous video from cloudinary
            if(herb.image) {
                const response = await deleteFromCloudinary(herb.video, 'video', process.env.FOLDER_NAME);
                console.log("Herb video deleted...", response);
            } 

            // upload new video to cloudinary
            const video = req.files.video;
            const videoResponse = await uploadFileToCloudinary(video, process.env.FOLDER_NAME);
            herb.video = videoResponse.secure_url;
        }

        // check for model
        if(req.files && req.files.model) {
            // delete previous model from cloudinary
            if(herb.model) {
                const response = await deleteFromCloudinary(herb.model, 'image', process.env.FOLDER_NAME);
                console.log("Herb model deleted...", response);
            }

            // upload new model to cloudinary
            const model = req.files.model;
            const modelResponse = await uploadFileToCloudinary(model, process.env.FOLDER_NAME);
            herb.model = modelResponse.secure_url;
        }

        // save updated herb in db
        await herb.save();

        // get updated herb details and return response
        const updatedHerbDetails = await Herb.findById(herbId);

        return res.status(200).json({
            success: true,
            message: "Herb updated successfully",
            data: updatedHerbDetails,
        });
    } catch(err) {
        console.error("EDIT HERB API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

// controller to delete herb
exports.deleteHerb = async (req, res) => {
    try {
        // fetch data
        const {herbId} = req.body;

        // validate data
        if(!herbId) {
            return res.status(400).json({
                success: false,
                message: "Herb id is required",
            });
        }

        // delete herb from db
        const deletedHerb = await Herb.findByIdAndDelete(herbId);

        if(!deletedHerb) {
            return res.status(404).json({
                success: false,
                message: `Herb with id: ${herbId} not found`,
            });
        }

        // delete media associated with herb

        // delete image
        if(deletedHerb.image) {
            const response = await deleteFromCloudinary(deletedHerb.image, "image", process.env.FOLDER_NAME);
            console.log("herb image deleted", response);
        }

        // delete video
        if(deletedHerb.video) {
            const response = await deleteFromCloudinary(deletedHerb.video, "video", process.env.FOLDER_NAME);
            console.log("herb video deleted", response);
        }
        
        // delete model
        if(deletedHerb.model) {
            const response = await deleteFromCloudinary(deletedHerb.model, "image", process.env.FOLDER_NAME);
            console.log("herb model deleted", response);
        }

        // return success response
        return res.status(200).json({
            success: true,
            message: "Herb deleted successfully",
            data: deletedHerb,
        });
    } catch(err) {
        console.error("DELETE HERB API error...", err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
}

// controller to get herb details
exports.getHerbDetails = async (req, res) => {
    try {
        // since GET req don't have body
        // fetch data from query parameters
        const {herbId} = req.query;

        // validate data
        if(!herbId) {
            return res.status(400).json({
                success: false,
                message: "Herb ID is required",
            });
        }

        // find herb from db
        const herbDetails = await Herb.findById(herbId);

        // if herb not found
        if(!herbDetails) {
            return res.status(404).json({
                success: false,
                message: `Herb with id: ${herbId} not found`, 
            });
        }

        // return success response
        return res.status(200).json({
            success: true,
            message: "Herb details fetched successfully",
            data: herbDetails,
        });
    } catch(err) {
        console.error("GET HERB DETAILS backend API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

// controller to get all herbs details
exports.getAllHerbs = async (req, res) => {
    try {
        // fetch all herbs
        const herbsDetails = await Herb.find();

        // return success response
        return res.status(200).json({
            success: true,
            message: "All herbs fetched successfully",
            data: herbsDetails
        });
    } catch(err) {
        console.error("GET ALL HERBS API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

// controller to get published herbs only
exports.getPublishedHerbs = async (req, res) => {
    try {
        // fetch all herbs
        const herbsDetails = await Herb.find({status:"published"});

        // return success response
        return res.status(200).json({
            success: true,
            message: "All herbs fetched successfully",
            data: herbsDetails
        });
    } catch(err) {
        console.error("GET ALL HERBS API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

// controller to add herb to bookmakrs
exports.addBookmark = async (req, res) => {
    try {
        // fetch data
        const {herbId} = req.body;
        const userId = req.user.id;

        // check if herb exits
        const herbDetails = await Herb.findById(herbId);

        if(!herbDetails) {
            return res.status(404).json({
                success: false,
                message: `Herb with id: ${herbId} not found`,
            });
        }

        // check if user already bookmarked herb
        if(herbDetails.bookmarks.includes(userId)) {
            return res.status(409).json({
                success: false,
                message: "Herb already bookmarked",
                data: isBookmarked,
            });
        }

        // add herb to bookmarks
        await User.findByIdAndUpdate(
            userId, 
            {
                $push: {
                    bookmarks: herbDetails._id
                }
            }).exec();

        // add user to herb bookmarks
        await Herb.findByIdAndUpdate(
            herbId,
            {$push: {bookmarks: userId}}
        );

        // get upddated user details
        const updatedUserDetails = await User.findById(userId)
            .populate('additionalDetails')
            .populate({
                path: 'notes',
                populate: {
                    path: 'herb',
                }
            }).exec();


        // return success response
        return res.status(200).json({
            success: true,
            message: "Herb added to bookmarks successfully",
            data: updatedUserDetails,
        })
    } catch(err) {
        console.error("ADD TO BOOKMARK API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            message: err.message,
        });
    }
}

// controller to remove herb from bookmakrs
exports.removeBookmark = async (req, res) => {
    try {
        // fetch data
        const {herbId} = req.body;
        const userId = req.user.id;

        // check if herb exists
        const herbDetails = await Herb.findById(herbId);
        if(!herbDetails) {
            return res.status(404).json({
                success: false,
                message: `Herb with id: ${herbId} not found`,
            });
        }

        // remove herb from user bookmarks
        await User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    bookmarks: herbDetails._id,
                }
            }).exec();

        // remove userId from herb bookmarks
        await Herb.findByIdAndUpdate(
            herbId,
            {$pull: {bookmarks: userId}}
        );

        // get updated user
        const updatedUserDetails = await User.findById(userId)
        .populate('additionalDetails')
        .populate({
            path: 'notes',
            populate: {
                path: 'herb',
            }
        }).exec();


        // return success response
        return res.status(200).json({
            success: true,
            message: "Herb removed from bookmarks",
            data: updatedUserDetails,
        });
    } catch(err) {
        console.error("REMOVE FROM BOOKMARKS API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error", 
            error: err.message,
        })
    }
}

// controller to get all bookmarked herbs
exports.getBookmarkedHerbs = async (req, res) => {
    try {
        const userId = req.user.id;

        // get all bookmarks herbs from user model by populating them
        const userDetails = await User.findById(userId)
            .populate('bookmarks')
            .exec();
        
        // return response
        return res.status(200).json({
            success: true,
            message: "Bookmarked herbs fetched successfully",
            data: userDetails.bookmarks,
        });
    } catch(err) {
        console.error("GET BOOKMARKED HERBS API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

// controller to like a herb
exports.likeHerb = async (req, res) => {
    try {
        //fetch data
        const {herbId} = req.body;
        const userId = req.user.id;

        // validate data
        if(!herbId) {
            return res.status(400).json({
                success: false,
                message: "Herb Id is required",
            });
        }

        // check if already liked
       const herbDetails = await Herb.findById(herbId);

        if(herbDetails.likes.includes(userId)) {
            return res.status(409).json({
                success: false,
                message: "Herb already liked",
            });
        }

        // add userId to herb likes
        const updatedHerbDetails = await Herb.findByIdAndUpdate(
            herbId,
            {$pull: {likes: userId}}
        );
        
        // if herb is not found
        if(!updatedHerbDetails) {
            return res.status(404).json({
                success: false,
                message: "Herb not found",
            });
        }

        // add herb id to user likes
        await User.findByIdAndUpdate(
            userId,
            {$push: {likes: updatedHerbDetails._id}}
        );

        // add user id to herb likes
        await Herb.findByIdAndUpdate(
            herbId,
            {$push: {likes: userId}}
        );

        // get updated user
        const updatedUserDetails = await User.findById(userId)
        .populate('additionalDetails')
        .populate({
            path: 'notes',
            populate: {
                path: 'herb',
            }
        }).exec();

        // return success response
        return res.status(200).json({
            success: true,
            message: "Herb liked successfully",
            data: updatedUserDetails,
        });
    } catch(err) {
        console.error("LIKE HERB API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal servere error",
            error: err.message,
        });
    }
}

// controller to unlike a herb
exports.unlikeHerb = async (req, res) => {
    try {
        // fetch data
        const {herbId} = req.body;
        const userId = req.user.id;

        // validate data
        if(!herbId) {
            return res.status(400).json({
                success: false,
                message: "Herb id is required",
            });
        }

        // remove user id from herb likes
        const updatedHerb = await Herb.findByIdAndUpdate(
            herbId,
            {$pull: {likes: userId}}
        );

        // if herb is not found
        if(!updatedHerb) {
            return res.status(404).json({
                success: false,
                message: "Herb not found",
            });
        }

        // remove herb Id from user likes
        await User.findByIdAndUpdate(
            userId,
            {$pull: {likes: updatedHerb._id}}
        );

        // get updated user details 
        const updatedUserDetails = await User.findById(userId)
        .populate('additionalDetails')
        .populate({
            path: 'notes',
            populate: {
                path: 'herb',
            }
        }).exec();

        // return success response
        return res.status(200).json({
            success: true,
            message: "Herb unliked successfully",
            data: updatedUserDetails,
        })
    } catch(err) {
        console.error("UNLIKE HERB API error...", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}
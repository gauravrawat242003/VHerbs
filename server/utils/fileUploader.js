const cloudinary = require('cloudinary').v2;

const uploadFileToCloudinary = async (file, folder, height, quality) => {
    // create options
    const options = {folder};
    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = 'auto';

    // upload file
    const response = await cloudinary.uploader.upload(file.tempFilePath, options);

    return response;
}

module.exports = uploadFileToCloudinary;
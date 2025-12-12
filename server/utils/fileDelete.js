const cloudinary = require('cloudinary').v2;

const deleteFromCloudinary = async (url , type, folder) => {
    const options = {resource_type: type}

    const public_id = url.split('/').pop().split('.').at(0).trim();
    // console.log("deleting public id: ", public_id);

    const path = `${folder}/${public_id}`

    const response = await cloudinary.uploader.destroy(path, options);

    return response;
}

module.exports = deleteFromCloudinary;
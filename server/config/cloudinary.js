const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });

        console.log("Cloudinary connection success");
    } catch(err) {
        console.log('Error while connecting with Cloudinary... =>', err.message);
        console.error(err);
    }
}

module.exports = cloudinaryConnect;
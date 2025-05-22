import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload file to Cloudinary
 * @param {string} localFilePath - Path to the file
 * @returns {Promise<Object>} - Cloudinary upload result
 */
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath){
            console.log("No file to upload");
            return null;
        }        
        //upload the file on cloudinary
        console.log('Uploading file to Cloudinary:', localFilePath); 
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("file is uploaded on cloudinary ", response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        console.error("Error uploading file on cloudinary: ", error);
        return null;
    }
}

/**
 * Upload image to Cloudinary with specific folder for alumni profiles
 * @param {string} filePath - Path to the file
 * @returns {Promise<Object>} - Cloudinary upload result
 */
const uploadImageToCloudinary = async (filePath) => {
    try {
        // Upload to cloudinary
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'alumni_profiles',
            use_filename: true,
            resource_type: "image"
        });
        
        // Delete the local file
        fs.unlinkSync(filePath);
        
        return result;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        // Delete the local file in case of error
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return null;
    }
};

export { uploadOnCloudinary, uploadImageToCloudinary }
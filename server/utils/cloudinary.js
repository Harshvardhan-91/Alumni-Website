import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
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

export {uploadOnCloudinary}
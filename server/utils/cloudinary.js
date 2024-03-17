import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv'
import fs from "fs"

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const res = await cloudinary.uploader.upload(localFilePath, {
            folder: 'dobby',
            resource_type: 'image',
        })
        fs.unlinkSync(localFilePath);
        console.log('file uploaded', res.url);
        return res;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        // remove the locally saved temp file incase the operations fails
        console.log(error);
    }
}

export { uploadCloudinary };
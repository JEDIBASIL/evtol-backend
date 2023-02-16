import { config } from "dotenv"
import { CloudinaryStorage, Options } from 'multer-storage-cloudinary';
import multer from 'multer';
import { v2 as cloudinary } from "cloudinary"

config()


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
})


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
} as Options);

const parser = multer({ storage: storage });

export {cloudinary, parser as imageParser }
export const { PORT, MONGODB_URI, ACCESS_TOKEN, MAIL_SERVICE, MAIL_PASS, MAIL_USER, WEB_URL } = process.env


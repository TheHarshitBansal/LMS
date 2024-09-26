import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { config } from 'dotenv';
config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'LMS',
      transformation: [{ width: 250, height: 250, gravity: 'faces', crop: 'fill' }],
      allowedFormats: ["png", "jpg", "jpeg"],
      public_id: (req, file) => file.originalname.split('.')[0],
    },
  });

  const upload = multer({ storage });

export default upload;
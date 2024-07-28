import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "CLOUDINARY_NAME",
  api_key: "CLOUDINARY_KEY",
  api_secret: "CLOUDINARY_SECRET",
});

export default cloudinary;

import { experimental_taintObjectReference } from "react";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// experimental_taintObjectReference(
//   "You cannot pass configuration preserved for the server",
//   cloudinary.v2,
// );

export default cloudinary.v2;

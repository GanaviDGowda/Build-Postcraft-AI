const { v2: cloudinary } = require('cloudinary');

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.warn(
    'Cloudinary environment variables are missing. Uploads will fail until they are provided.'
  );
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = async (buffer, folder = 'postcraft') => {
  if (!buffer) {
    throw new Error('No file buffer provided for upload.');
  }

  const base64String = buffer.toString('base64');
  const dataUri = `data:image/png;base64,${base64String}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: 'image',
  });

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};

module.exports = {
  uploadImageToCloudinary,
};


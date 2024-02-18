const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploads = (buffer: Uint8Array, folder: string) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: folder,
      },
      (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.url,
            id: result.public_id,
          });
        }
      }
    );

    const bufferData = Buffer.from(buffer);

    stream.end(bufferData);
  });
};

export { uploads, cloudinary };

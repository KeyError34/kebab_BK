import { cloudinary } from "../cloudinary/cloudinary.js";

export class FileUploader {
  static async uploadToCloudinary(
    buffer: Buffer,
    resourceType: 'image' | 'video'
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: resourceType },
        (error, result) => {
          if (error || !result?.secure_url) {
            return reject(
              new Error('Cloudinary upload failed: ' + (error?.message || 'No URL'))
            );
          }
          resolve(result.secure_url);
        }
      );
      stream.end(buffer);
    });
  }

  static async deleteFromCloudinary(publicId: string): Promise<void> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      if (result.result !== 'ok') {
        throw new Error(`Failed to delete from Cloudinary: ${result.result}`);
      }
    } catch (error) {
      console.error('Cloudinary deletion error:', error);
      throw error; 
    }
  }
}
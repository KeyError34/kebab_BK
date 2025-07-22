import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';


const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    // if (!req.user) return cb(new Error('User is not authorized'));

    const allowedTypes = /jpeg|jpg|png|gif|mp4/;
    const isValidExtname = allowedTypes.test(file.originalname.toLowerCase());
    const isValidMimeType = allowedTypes.test(file.mimetype);

    if (isValidExtname && isValidMimeType) {
      return cb(null, true);
    } else {
      return cb(new Error('Invalid file type. Only images and videos are allowed.'));
    }
  },
});

export default upload;
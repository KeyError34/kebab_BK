import { AppConfig } from '../types/typesDb.js';
const config: AppConfig = {
  port: process.env.PORT || 3000,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGO_URI,
  emailUser: process.env.EMAIL_USER,
  passUser: process.env.PASS_USER,
  resetUri:process.env.URI_RESET,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey:process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};
export default config;

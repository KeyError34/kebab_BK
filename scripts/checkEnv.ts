import '../src/core/config/index.js';

const requiredEnvKeys = [
  'PORT',
  'JWT_SECRET',
  'MONGO_URI',
  'DB_USER',
  'DB_PASS',
  'DB_NAME',
  'EMAIL_USER',
  'PASS_USER',

  'URI_RESET',

  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
];

const missingKeys = requiredEnvKeys.filter((key) => !process.env[key]);

if (missingKeys.length > 0) {
  console.error(`🚨 Missing environment variables: ${missingKeys.join(', ')}`);
  process.exit(1);
} else {
  console.log('✅ All required environment variables are set.');
}

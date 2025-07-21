export type AppConfig = {
  port: string | number;
  dbHost?: string;
  dbPort?: string;
  dbUser?: string;
  dbPass?: string;
  dbName?: string;
  jwtSecret?: string;
  mongoUri?:string
  emailUser?:string
  passUser?: string
  resetUri?: string
  cloudinaryCloudName?: string
  cloudinaryApiKey?: string
  cloudinaryApiSecret?: string
};

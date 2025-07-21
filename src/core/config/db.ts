import mongoose from "mongoose";
import config from './index.js';
const { dbUser, dbPass, dbName, mongoUri } = config;
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri || '', {
      user: dbUser || 'root',
      pass: dbPass || '666777lyly',
      dbName: dbName || 'instack',
    });
    console.log('Connected to Mongo DB');
  } catch (error) {
    console.error('Error connectiong to database: ', {
      error: (error as Error).message,
    });
  }
}
export default connectDB;

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
// import nano from 'nano';
// import config from './index.js';
// const { dbUser, dbPass, dbHost, dbPort } = config;
// // Encode credentials for Basic Auth
// const encodedCredentials = Buffer.from(`${dbUser}:${dbPass}`).toString('base64');
// const dbUrl = `http://${dbHost}:${dbPort}`;
// const couch = nano({
//   url: dbUrl,
//   requestDefaults: { headers: { Authorization: `Basic ${encodedCredentials}` } },
// });

// const useDatabase = (dbName: string = process.env.DB_NAME as string) => {
//   return couch.use(dbName);
// };
// export { useDatabase };

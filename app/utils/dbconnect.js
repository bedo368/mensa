import mongoose from "mongoose";

// Specify the MongoDB URI and include the database name
const MONGODB_URI = `mongodb+srv://user:JUeucc905NPw0B9b@cluster0.qjvmb.mongodb.net/`;

if (!MONGODB_URI) {
  throw new Error("يرجى إعداد متغير البيئة MONGODB_URI في ملف .env.local");
}

// Create a cached connection object for Mongoose
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If there is an existing connection, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If there is no existing promise, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable buffering for faster connections
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  // Wait for the promise to resolve and cache the connection
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

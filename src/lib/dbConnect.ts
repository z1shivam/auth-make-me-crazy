import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log(`Already connected to DB.`);
    return;
  }
  
  try {
    const db = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.MONGO_DB}` || "",
      {}
    );
    connection.isConnected = db.connections[0]?.readyState;
    console.log(`DB connected Successfully! - ${db.connection.host}`);
  } catch (error) {
    console.log(`DB connection failed. - ${error}`);
    process.exit(1);
  }
}

export default dbConnect;
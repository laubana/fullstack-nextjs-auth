import { MongoClient } from "mongodb";

export const connect = async () => {
  try {
    const client = await MongoClient.connect(process.env.DB_URI);

    return client;
  } catch (error) {
    console.error(error);

    console.error("Failed to connect to DB 🚨");
  }
};

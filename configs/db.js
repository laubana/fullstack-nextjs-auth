import { MongoClient } from "mongodb";

export const connect = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URI);

  return client;
};

import { MongoClient } from "mongodb";

export const connect = async () => {
  const client = await MongoClient.connect(process.env.DB_URI);

  return client;
};

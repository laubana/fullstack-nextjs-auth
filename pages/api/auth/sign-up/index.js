import { connect } from "../../../../configs/db";

import { hash } from "../../../../helpers/auth";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(401).json({ message: "Invalid Input" });

        return;
      }

      const client = await connect();

      const db = client.db();

      const existingUser = await db.collection("users").findOne({ email });

      if (existingUser) {
        res.status(409).json({ message: "Email already exists." });

        return;
      }

      const newUser = await db
        .collection("users")
        .insertOne({ email, password: hash(password) });

      res
        .status(201)
        .json({ message: "User created successfully.", data: newUser });
    } else {
      res.status(404).send();
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error!" });
  }
};

export default handler;

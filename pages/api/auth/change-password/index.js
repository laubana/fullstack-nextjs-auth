import { getServerSession } from "next-auth";

import authConfig from "@configs/authConfig";
import dbConfig from "@configs/dbConfig";
import { hashPassword, verifyPassword } from "@helpers/password";

const handler = async (req, res) => {
  try {
    if (req.method === "PATCH") {
      const { oldPassword, newPassword } = req.body;
      const session = await getServerSession(req, res, authConfig.authOptions);

      if (!oldPassword || !newPassword) {
        res.status(400).json({ message: "Invalid Input" });

        return;
      }

      if (!session) {
        res.status(401).json({ message: "Unauthorized" });

        return;
      }

      const client = await dbConfig.connect();
      const db = client.db();

      const existingEmail = session.user.email;

      const existingUser = await db.collection("users").findOne({
        email: existingEmail,
      });

      const isVerified = verifyPassword(oldPassword, existingUser.password);

      if (!isVerified) {
        res.status(403).json({ message: "Forbidden" });
      }

      const updatedUser = await db
        .collection("users")
        .updateOne(
          { email: existingEmail },
          { $set: { password: hashPassword(newPassword) } }
        );

      res
        .status(201)
        .json({ message: "Password updated successfully.", data: updatedUser });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error" });
  }
};

export default handler;

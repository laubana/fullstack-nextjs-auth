import { getServerSession } from "next-auth";

import { authOptions } from "../../../../configs/authOptions";
import { connect } from "../../../../configs/db";

import { hash, verify } from "../../../../helpers/auth";

const handler = async (req, res) => {
  try {
    if (req.method === "PATCH") {
      const { newPassword, oldPassword } = req.body;
      const session = await getServerSession(req, res, authOptions);

      if (!newPassword || !oldPassword) {
        res.status(400).json({ message: "Invalid Input" });

        return;
      }

      if (!session) {
        res.status(401).json({ message: "Unauthorized" });

        return;
      }

      const existingEmail = session.user.email;

      const client = await connect();

      const db = client.db();

      const existingUser = await db.collection("users").findOne({
        email: existingEmail,
      });

      const isVerified = verify(oldPassword, existingUser.password);

      if (!isVerified) {
        res.status(403).json({ message: "Forbidden" });
      }

      const updatedUser = await db
        .collection("users")
        .updateOne(
          { email: existingEmail },
          { $set: { password: hash(newPassword) } }
        );

      res
        .status(201)
        .json({ message: "Password updated successfully.", data: updatedUser });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server Error!" });
  }
};

export default handler;

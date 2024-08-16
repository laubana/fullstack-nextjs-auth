import CredentialsProvider from "next-auth/providers/credentials";

import { connect } from "./db";

import { verify } from "../helpers/auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        const client = await connect();

        const db = client.db();

        const existingUser = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!existingUser) {
          return null;
        }

        const isVerified = verify(credentials.password, existingUser.password);

        if (!isVerified) {
          return null;
        }

        return {
          email: existingUser.email,
          name: "",
          id: existingUser._id.toString(),
          image: "",
        };
      },
      name: "Email",
    }),
  ],
  //   callbacks: {
  //     session: async ({ session, token }) => {
  //       if (token.email) {
  //         await db();

  //         const user = await User.findOne({ email: token.email });

  //         session.user = {
  //           email: user.email,
  //           id: user.id,
  //           name: user.name,
  //           role: user.role,
  //         };
  //       }

  //       return session;
  //     },
  //     signIn: async ({ account, profile, credentials }) => {
  //       try {
  //       } catch (error) {
  //         console.error(error);

  //         return "/";
  //       }
  //     },
  //   },
};

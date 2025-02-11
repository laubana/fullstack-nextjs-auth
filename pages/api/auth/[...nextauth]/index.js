import NextAuth from "next-auth";

import authConfig from "@configs/authConfig";

export default NextAuth(authConfig.authOptions);

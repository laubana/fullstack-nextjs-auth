import NextAuth from "next-auth";

import { authOptions } from "../../../../configs/authOptions";

export default NextAuth(authOptions);

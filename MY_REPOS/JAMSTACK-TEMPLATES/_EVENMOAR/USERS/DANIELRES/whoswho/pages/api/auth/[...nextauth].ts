import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { NowRequest, NowResponse } from "@vercel/node";
import * as config from "../../../src/api/config";

const options = {
  providers: [
    Providers.Facebook({
      clientId: config.auth.facebook.clientId,
      clientSecret: config.auth.facebook.clientSecret,
    }),

    // Providers.Google({
    //   clientId: String(process.env.GOOGLE_ID),
    //   clientSecret: String(process.env.GOOGLE_SECRET),
    // }),
    // Passwordless / email sign in

    // Providers.Email({
    //   server: process.env.MAIL_SERVER,
    //   from: "NextAuth.js <no-reply@example.com>",
    // }),
  ],
  // Optional SQL or MongoDB database to persist users
  // database: process.env.DATABASE_URL,
};

export default (req: NowRequest, res: NowResponse) =>
  NextAuth(req, res, options);

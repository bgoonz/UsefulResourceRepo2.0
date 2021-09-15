/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import bcrypt from "bcrypt";
import config from "../../../config";
import { Ctx } from "../../context";
import codes from "../../errors/codes";
import SignupError from "../../errors/SignupError";
import arrayMatches from "../../utils/arrayMatches";

const { SALT_ROUNDS } = config.bcrypt;

interface SignupArgs {
  input: {
    email: string;
    name: string;
    password: string;
  };
}

export default async ({}, args: SignupArgs, ctx: Ctx) => {
  try {
    const { password, ...rest } = args.input;
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    return await ctx.db.user.create({
      data: { ...rest, password: hashed },
    });
  } catch (error) {
    if (error.code === codes.PRISMA_UNIQUE_CONSTRAINT_ERROR)
      if (arrayMatches(error.meta.target, ["email"]))
        throw new SignupError("Email not available");

    throw error;
  }
};

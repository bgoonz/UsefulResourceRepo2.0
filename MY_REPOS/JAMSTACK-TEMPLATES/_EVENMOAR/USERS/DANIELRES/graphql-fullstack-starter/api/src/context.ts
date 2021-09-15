import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface CtxArgs {
  req: Request;
  res: Response;
}

export interface Ctx {
  req: Request;
  res: Response;
  db: PrismaClient;
}

export default ({ req, res }: CtxArgs): Ctx => ({
  req,
  res,
  db: prisma,
});

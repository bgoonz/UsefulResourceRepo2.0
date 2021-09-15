import { NowResponse } from "@vercel/node";
import { reportError } from "./reportError";

export const handleUnknownError = (res: NowResponse, prefix: string) => (
  error: any
) => {
  const status = 500;
  const { id } = reportError({ prefix, error, status });

  return res.status(status).json({
    code: error.code,
    error: error.message,
    id,
    status,
  });
};

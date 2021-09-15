import { Response, NextFunction } from "express";

export type Middleware = (
  req: CookieSessionInterfaces.CookieSessionRequest,
  res: Response,
  next: NextFunction
) => void;

import { Response, NextFunction } from "express";
import Layout from "../templates/Layout";

export default (
  req: CookieSessionInterfaces.CookieSessionRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.user) return next();
  res.send(Layout("Private", "Access forbidden", req.session));
};

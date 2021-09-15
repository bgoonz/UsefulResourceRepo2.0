import { Request, Response, NextFunction } from "express";
import { Middleware } from "../../../interfaces";

export default (routes: string[]) => (middleware: Middleware) => (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  routes.some((path) => path === req.path)
    ? next()
    : middleware(req as any, res as any, next);

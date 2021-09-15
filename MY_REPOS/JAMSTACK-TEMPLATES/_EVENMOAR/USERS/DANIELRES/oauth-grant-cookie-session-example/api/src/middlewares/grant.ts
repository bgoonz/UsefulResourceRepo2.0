import { NextFunction, Request, Response } from "express";
import grant from "grant";
import config from "../config";

export default (req: Request, res: Response, next: NextFunction) => {
  grant.express()(config.grant)(req, res, next);
};

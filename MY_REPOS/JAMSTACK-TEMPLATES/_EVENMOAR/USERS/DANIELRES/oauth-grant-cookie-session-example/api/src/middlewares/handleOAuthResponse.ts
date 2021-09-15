import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.profile) return next();

  req.session.user = {
    email: req.query.profile["email"],
    sub: req.query.profile["sub"],
    provider: req.session.grant.provider,
  };

  delete req.session.grant;

  res.redirect("/");
};

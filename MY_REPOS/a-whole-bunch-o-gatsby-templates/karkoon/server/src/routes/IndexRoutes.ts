import * as Express from 'express';

export const IndexRouter = Express.Router();

/* GET home page. */
IndexRouter.get(
  '/',
  (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.render('index', { title: 'Express' });
  }
);

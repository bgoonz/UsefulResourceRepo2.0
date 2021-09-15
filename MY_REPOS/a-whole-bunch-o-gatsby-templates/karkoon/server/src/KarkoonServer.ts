import CookieParser from 'cookie-parser';
import { renderFile } from 'ejs';
import Express from 'express';
import CreateError from 'http-errors';
import logger from 'morgan';
import { join } from 'path';

import { IndexRouter } from './routes/IndexRoutes';

export class KarkoonServer {
  private server: Express.Application = Express();

  public StartServer() {
    this.Configure();
    this.SetupRoutes();

    this.server.listen(process.env.PORT || 3000, () => {
      console.log('Karkoon Server Running on #' + (process.env.PORT || 3000));
    });
  }

  private Configure(): void {
    this.server.engine('html', renderFile);
    this.server.set('view engine', 'html');
    this.server.set('views', join(__dirname, 'static'));
    this.server.use(logger('dev'));
    this.server.use(Express.json());
    this.server.use(Express.urlencoded({ extended: false }));
    this.server.use(CookieParser());
    this.server.use(Express.static(join(__dirname, 'static')));
  }

  private SetupRoutes(): void {
    this.server.use('/', IndexRouter);

    this.SetupRoutingMiddlewares();
  }

  private SetupRoutingMiddlewares(): void {
    // catch 404 and forward to error handler
    this.server.use(
      (
        req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction
      ) => {
        next(CreateError(404));
      }
    );
  }
}

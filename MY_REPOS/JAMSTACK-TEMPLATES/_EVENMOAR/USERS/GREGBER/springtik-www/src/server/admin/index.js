import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import connectRedis from 'connect-redis';
import configurePassport from './configurePassport';
import admPublic from './public';
import admPrivate from './private';
import config from '~/config';

const router = express.Router();

const RedisStore = connectRedis(session);

router.use(bodyParser.json());
router.use(session({
  secret: config.get('session.secret'),
  resave: true,
  saveUninitialized: true,
  store: new RedisStore(config.get('session.redis')),
}));
router.use(passport.initialize());
router.use(passport.session());

configurePassport(passport);

router.use((req, res, next) => {
  if (req.isAuthenticated())
    admPrivate(req, res, next);
  else
    admPublic(req, res, next);
});

export default router;

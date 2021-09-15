import express from 'express';
import passport from 'passport';
import {BAD_CREDENTIALS} from '~/modules/loginErrors';

const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate(
    'local',
    {
      badRequestMessage: BAD_CREDENTIALS,
    },
    (err, user, query) => {
      if (err)
        return next(err);

      if (!user)
        return res.send({success: false, message: query.message});

      req.login(user, err => {
        if (err)
          return next(err);

        res.send({success: true});
      });
    }
  )(req, res, next);
});

export default router;

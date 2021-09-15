import {Strategy} from 'passport-local';
import User from '~/server/models/User';
import * as loginErrors from '~/modules/loginErrors';

export default passport => {
  passport.use(new Strategy({
    usernameField: 'email',
  }, (email, password, done) => {
    User
      .query()
      .where({email})
      .then(([user]) => {
        if (!user) {
          return done(null, false, {message: loginErrors.USERNAME_NOT_FOUND});
        }

        return user.validPassword(password)
          .then(isValid => {
            if (!isValid) {
              return done(null, false, {message: loginErrors.INCORRECT_PASSWORD});
            }

            done(null, user);
          });
      })
      .catch(err => done(err));
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User
      .query()
      .where({id})
      .then(([user]) => done(null, user))
      .catch(err => done(err));
  });
};

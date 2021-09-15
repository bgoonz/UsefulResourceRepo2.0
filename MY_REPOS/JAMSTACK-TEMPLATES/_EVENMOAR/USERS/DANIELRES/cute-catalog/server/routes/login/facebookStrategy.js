const FacebookStrategy = require("passport-facebook").Strategy;

const countUsers = require("../../queries/countUsers");
const findOrCreateUserByFacebookId = require("../../queries/findOrCreateUserByFacebookId");

module.exports = new FacebookStrategy(
  {
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    profileFields: ["id", "displayName", "email"],
  },
  async (accessToken, refreshToken, profile, cb) => {
    let error;
    let user;
    try {
      const isFirstUser = (await countUsers()) === 0;
      user = await findOrCreateUserByFacebookId({
        email: profile.emails[0].value,
        facebookId: profile.id,
        isAdmin: isFirstUser ? true : false,
        name: profile.displayName,
      });
    } catch (e) {
      error = e;
    }

    return cb(error, user);
  }
);

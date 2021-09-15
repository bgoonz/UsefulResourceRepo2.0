const express = require("express");
const passport = require("passport");

const ServerError = require("../../ServerError");

const countUsers = require("../../queries/countUsers");
const createUserByEmailPassword = require("../../queries/createUserByEmailPassword");
const findUserByEmailPassword = require("../../queries/findUserByEmailPassword");
const findUserById = require("../../queries/findUserById");

const decodeToken = require("../../helpers/jwt/decodeToken");

const facebookStrategy = require("./facebookStrategy");
const setAuthCookies = require("./setAuthCookies");
const sendRegistrationConfirmationEmailToUser = require("./sendRegistrationConfirmationEmailToUser");

const router = express.Router();
router.use(passport.initialize());

passport.use(facebookStrategy);

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmailPassword({ email, password });
    if (!user) return next(ServerError(404, "User not found"));

    const { emailConfirmedAt } = user;
    if (!emailConfirmedAt)
      return next(
        ServerError(
          403,
          "Email not verified. Please check your mailbox and use the confirmation link."
        )
      );

    setAuthCookies({ res, user });

    res.json({ success: true });
  } catch (e) {
    next(e);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const isFirstUser = (await countUsers()) === 0;
    const user = await createUserByEmailPassword({
      email,
      isAdmin: isFirstUser ? true : false,
      name,
      password,
    });

    await sendRegistrationConfirmationEmailToUser(user);

    res.json({
      success: true,
      info: {
        registrationTokenMaxAge: process.env.REGISTRATION_TOKEN_MAX_AGE,
      },
    });
  } catch (e) {
    if (e.name === "ValidationError")
      next(
        ServerError(
          400,
          "Could not create a new user with these credentials, please try again or to login as an existing user instead.",
          e
        )
      );
    next(ServerError(500, "Unknown error, please try again", e));
  }
});

router.post("/register/confirm", async (req, res, next) => {
  try {
    const { userId } = await decodeToken({ token: req.body.token });
    const user = await findUserById(userId);

    if (user.emailConfirmedAt)
      return res.json({ success: true, info: "Email already confirmed" });

    await user.$query().patch({ emailConfirmedAt: new Date().toISOString() });

    res.json({ success: true });
  } catch (e) {
    next(
      ServerError(
        500,
        "Could not confirm user account, please try again soon.",
        e
      )
    );
  }
});

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res, next) => {
    try {
      setAuthCookies({ res, user: req.user });

      res.redirect("/");
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;

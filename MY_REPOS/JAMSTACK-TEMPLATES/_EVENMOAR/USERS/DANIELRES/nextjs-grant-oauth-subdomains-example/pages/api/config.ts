export const cookieSession = {
  maxAge: 15 * 60e3, // 15 minutes (sliding)
  name: "session",
  secret: process.env.COOKIE_SESSION_SECRET,
  sameSite: "lax",
};

export const grant = {
  defaults: {
    origin: process.env.OAUTH_DEFAULTS_ORIGIN,
    transport: "session",
    state: true,
  },
  google: {
    key: process.env.OAUTH_GOOGLE_KEY,
    secret: process.env.OAUTH_GOOGLE_SECRET,
    scope: ["openid", "email", "profile"],
    response: ["tokens", "profile"],
    callback: "/api/oauth/callback",
  },
};

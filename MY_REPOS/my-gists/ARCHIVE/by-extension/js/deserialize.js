passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);

    if (!user) throw new Error("User session not found");

    done(null, user);
  } catch (e) {
    done(e);
  }
});

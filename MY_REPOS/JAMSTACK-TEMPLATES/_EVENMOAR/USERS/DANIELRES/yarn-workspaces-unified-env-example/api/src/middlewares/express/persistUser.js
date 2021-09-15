import { User } from "db/queries";

export default async (req, res, next) => {
  const { user } = req;
  let dbUser;

  dbUser = await User.findBySub(user.sub);

  if (!dbUser) {
    dbUser = await User.create({
      sub: user.sub,
      name: user.name,
      email: user.email,
      picture: user.picture
    });
    await User.createTenant(dbUser, { name: "My team" });
  }

  req.user = dbUser;

  next();
};

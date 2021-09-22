export const isAuthorized = (user, role) => {
  return user && user[process.env.AUTH0_NAMESPACE + "/roles"].includes(role);
};

export const authorizeUser = async (req, res) => {
  const session = await auth0.getSession(req, res);
  if (!session || !session.user) {
    res.writeHead(302, {
      Location: "/api/auth/login",
    });
    res.end();
    return null;
  }

  return session.user;
};

export const withAuth =
  (getData) =>
  async ({ req, res }) => {
    const session = await auth0.getSession(req, res);
    if (!session || !session.user) {
      res.writeHead(302, {
        Location: "/api/auth/login",
      });
      res.end();
      return { props: {} };
    }

    const data = getData ? await getData({ req, res }, session.user) : {};

    return { props: { user: session.user, ...data } };
  };

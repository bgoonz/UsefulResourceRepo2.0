export default (
  title: string,
  children: string,
  session: CookieSessionInterfaces.CookieSessionObject
) => {
  const ifLogged = (content: string) => (session.user ? content : "");
  const unlessLogged = (content: string) => (!session.user ? content : "");

  return `
    <div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>

          ${ifLogged(
            `
              <li><a href="/profile">Profile</a></li>
              <li><a href="/logout">Logout</a></li>
            `
          )}

          ${unlessLogged(
            `
              <li><a href="/login">Login</a></li>
            `
          )}
        </ul>
      </nav>
    </div>

    <h3>
      ${title}
    </h3>
    <div>
      ${children}
    </div>
`;
};

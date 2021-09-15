Cypress.Commands.add("login", (overrides = {}) => {
  Cypress.log({ name: "Login via Auth0" });

  const options = {
    method: "POST",
    url: `https://${Cypress.env("AUTH0_DOMAIN")}/oauth/token`,
    body: {
      grant_type: "password",
      scope: "openid profile email",
      audience: Cypress.env("AUTH0_AUDIENCE"),
      client_id: Cypress.env("UI_AUTH0_CLIENT_ID"),
      client_secret: Cypress.env("AUTH0_CLIENT_SECRET"),
      password: Cypress.env("AUTH0_PASSWORD"),
      username: Cypress.env("AUTH0_USERNAME")
    }
  };

  cy.request(options);
});

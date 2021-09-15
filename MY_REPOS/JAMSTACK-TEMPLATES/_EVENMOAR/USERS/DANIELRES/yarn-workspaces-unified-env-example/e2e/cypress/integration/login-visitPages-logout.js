describe("login, visit pages, logout", () => {
  it("should successfully login, visit al pages, then logout", () => {
    cy.login().then(({ body: { access_token } }) => {
      const port = Cypress.env("UI_DEV_SERVER_PORT");
      const url = `http://localhost:${port}/#access_token=${access_token}`;

      cy.visit(url);
      cy.get("[data-test-id=button-sidemenu-spaces]").click();
      cy.get("[data-test-id=button-space-1]").click();
      cy.get("[data-test-id=pagetitle-space]");

      cy.get("[data-test-id=button-sidemenu-user]").click();
      cy.get("[data-test-id=button-profile]").click();
      cy.get("[data-test-id=pagetitle-profile]");

      cy.get("[data-test-id=button-sidemenu-user]").click();
      cy.get("[data-test-id=button-logout]").click();
      cy.get("[data-test-id=button-login]");
    });
  });
});

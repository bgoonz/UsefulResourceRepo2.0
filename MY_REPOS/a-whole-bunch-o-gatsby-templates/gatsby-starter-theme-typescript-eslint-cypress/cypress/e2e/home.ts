/// <reference types="../support/index" />
/// <reference types="cypress" />
/// <reference types="@testing-library/cypress/typings" />

describe(`example`, () => {
  it(`contains keyword`, () => {
    cy.visit(`/`)
      .waitForRouteChange()
      .getByText(/say: hello!/i)
  })
})

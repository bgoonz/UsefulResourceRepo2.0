describe('home', () => {
  beforeEach(() => {
    cy.visit('/').waitForRouteChange()
  })

  it('should have the hero content', () => {
    cy.getByText(/frontend entwickler/i)
      .getByText(/Hey, ich bin Arya./i)
      .getByText(/Twitter/i)
  })

  it('should have recent posts', () => {
    cy.getByText(/Ein Lannister bezahlt immer seine Schulden./i)
  })

  it('should have recent projects', () => {
    cy.getByText(/Produktion einer eigenen Tastatur/i)
  })

  it('should have a footer', () => {
    cy.getByText(/Valar Morghulis/i)
  })
})

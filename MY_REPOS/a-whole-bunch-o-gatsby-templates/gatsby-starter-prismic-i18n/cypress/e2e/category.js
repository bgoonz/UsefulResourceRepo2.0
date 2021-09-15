describe('category', () => {
  it('should exist on index "recent posts" and work', () => {
    cy.visit('/')
      .waitForRouteChange()
      .getByText(/Ankündigung/i)
      .click()
      .waitForRouteChange()
      .assertRoute('/categories/ankundigung')
      .getByText(/Kategorie/i)
  })
  it('should have correct posts on individual overview pages', () => {
    cy.visit('/categories/ankundigung')
      .waitForRouteChange()
      .getByText(/Warum Du King's Landing nicht besuchen solltest/i)
  })
})

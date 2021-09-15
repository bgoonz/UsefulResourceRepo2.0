/// <reference types="Cypress" />

context("Preconnect", () => {
  it("A preconnect link should be added for every specified domain with correct crossorigin attribute", () => {
    cy.visit("http://localhost:9000")
    cy.get("link").then(($el) => {
      let tagFound = false
      $el.each((i, el) => {
        const href = el.getAttribute("href")

        // base string domains
        if (
          el.nodeName.toLowerCase() === "link" &&
          (href.includes("https://foo.com") || href.includes("https://bar.com"))
        ) {
          tagFound = true
          expect(el.getAttribute("rel")).to.equal("preconnect")
          expect(el.getAttribute("crossorigin")).to.equal("")
        }

        // custom domain config w/ cross origin enabled
        if (
          el.nodeName.toLowerCase() === "link" &&
          href.includes("https://enablecors.com")
        ) {
          tagFound = true
          expect(el.getAttribute("rel")).to.equal("preconnect")
          expect(el.getAttribute("crossorigin")).to.equal("")
        }

        // custom domain config w/ cross origin disabled
        if (
          el.nodeName.toLowerCase() === "link" &&
          href.includes("https://disablecors.com")
        ) {
          tagFound = true
          expect(el.getAttribute("rel")).to.equal("preconnect")
          expect(el.getAttribute("crossorigin")).to.be.null
        }

        // custom domain config w/ cross origin credentials
        if (
          el.nodeName.toLowerCase() === "link" &&
          href.includes("https://corswithcreds.com")
        ) {
          tagFound = true
          expect(el.getAttribute("rel")).to.equal("preconnect")
          expect(el.getAttribute("crossorigin")).to.equal("use-credentials")
        }

        // custom domain config w/ cross origin anonymous
        if (
          el.nodeName.toLowerCase() === "link" &&
          href.includes("https://corswithanonymous.com")
        ) {
          tagFound = true
          expect(el.getAttribute("rel")).to.equal("preconnect")
          expect(el.getAttribute("crossorigin")).to.equal("anonymous")
        }
      })
      expect(tagFound).to.equal(true)
    })
  })
})

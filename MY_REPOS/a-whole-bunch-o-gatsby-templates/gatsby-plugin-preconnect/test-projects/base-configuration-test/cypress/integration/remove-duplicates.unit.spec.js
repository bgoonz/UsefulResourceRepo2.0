/// <reference types="Cypress" />

import { removeDuplicates } from ".../../../src/utils"

context("removeDuplicates", () => {
  context("When invoked", () => {
    context("And an array of one option is passed", () => {
      it("Then it returns an equal array", () => {
        const domainsObj = [{ domain: "http://foo.com" }]

        const result = removeDuplicates(domainsObj)

        const expectedResult = [{ domain: "http://foo.com" }]
        expect(result).to.deep.equal(expectedResult)
      })
    })

    context("And an array of domains with no duplicates is passed", () => {
      it("Then it returns an equal array", () => {
        const domainsObj = [
          { domain: "http://foo.com" },
          { domain: "http://bar.com" },
        ]

        const result = removeDuplicates(domainsObj)

        const expectedResult = [
          { domain: "http://foo.com" },
          { domain: "http://bar.com" },
        ]
        expect(result).to.deep.equal(expectedResult)
      })
    })

    context("And an array of domains with duplicates is passed", () => {
      it("Then it returns an array without the duplicated option", () => {
        const domainsObj = [
          { domain: "http://foo.com" },
          { domain: "http://bar.com" },
          { domain: "http://foo.com" },
        ]

        const result = removeDuplicates(domainsObj)

        const expectedResult = [
          { domain: "http://foo.com" },
          { domain: "http://bar.com" },
        ]
        expect(result).to.deep.equal(expectedResult)
      })
    })

    context(
      "And an array of domains with different crossOrigin options",
      () => {
        it("Then it returns an array without the duplicated options", () => {
          const domainsObj = [
            { domain: "http://foo.com" },
            { domain: "http://foo.com", crossOrigin: true },
            { domain: "http://foo.com", crossOrigin: false },
            { domain: "http://foo.com", crossOrigin: "anonymous" },
            { domain: "http://foo.com", crossOrigin: "use-credentials" },
            { domain: "http://bar.com" },
            { domain: "http://bar.com", crossOrigin: true },
            { domain: "http://bar.com", crossOrigin: false },
            { domain: "http://bar.com", crossOrigin: "anonymous" },
            { domain: "http://bar.com", crossOrigin: "use-credentials" },
          ]
          const domainsObjWithDuplicates = [...domainsObj, ...domainsObj]

          const result = removeDuplicates(domainsObjWithDuplicates)

          const expectedResult = domainsObj
          expect(result).to.deep.equal(expectedResult)
        })
      }
    )
  })
})

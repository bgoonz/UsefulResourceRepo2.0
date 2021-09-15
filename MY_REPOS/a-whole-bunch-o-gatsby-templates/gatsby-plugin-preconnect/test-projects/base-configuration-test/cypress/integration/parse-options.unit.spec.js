/// <reference types="Cypress" />

import { parseOptions } from ".../../../src/utils"

context("parseOptions", () => {
  context("When invoked", () => {
    context("And an array of domains is passed", () => {
      it("Then it returns the extended options for every domain with `crossOrigin` set to true", () => {
        const domains = ["http://foo.com", "http://bar.com"]

        const result = parseOptions(domains)

        const expectedResult = [
          { domain: "http://foo.com", crossOrigin: "" },
          { domain: "http://bar.com", crossOrigin: "" },
        ]
        expect(result).to.deep.equal(expectedResult)
      })
    })

    context("And an array of domains object is passed", () => {
      it("Then it returns same result of the array of domains call", () => {
        const domains = ["http://foo.com", "http://bar.com"]
        const domainsObj = [
          { domain: "http://foo.com" },
          { domain: "http://bar.com" },
        ]

        const result = parseOptions(domainsObj)

        const expectedResult = parseOptions(domains)
        expect(result).to.deep.equal(expectedResult)
      })
    })

    context("And an empty domain is passed", () => {
      it("Then it throws an error", () => {
        // act
        const domains = ["", "http://bar.com"]
        const domainsObj = [{ domain: "" }, "http://bar.com"]

        expect(() => parseOptions(domains)).to.throw()
        expect(() => parseOptions(domainsObj)).to.throw()
      })
    })

    context("And the crossOrigin options is set", () => {
      context("And the crossOrigin options is set to true", () => {
        it("Then it returns the extended options for every domain with `crossOrigin` set to true", () => {
          const domainsObj = [
            { domain: "http://foo.com", crossOrigin: true },
            { domain: "http://bar.com", crossOrigin: true },
          ]

          const result = parseOptions(domainsObj)

          const expectedResult = [
            { domain: "http://foo.com", crossOrigin: "" },
            { domain: "http://bar.com", crossOrigin: "" },
          ]
          expect(result).to.deep.equal(expectedResult)
        })
      })

      context("And the crossOrigin options is set to false", () => {
        it("Then it returns the extended options for every domain with `crossOrigin` set to false", () => {
          const domainsObj = [
            { domain: "http://foo.com", crossOrigin: false },
            { domain: "http://bar.com", crossOrigin: false },
          ]

          const result = parseOptions(domainsObj)

          const expectedResult = [
            { domain: "http://foo.com", crossOrigin: false },
            { domain: "http://bar.com", crossOrigin: false },
          ]
          expect(result).to.deep.equal(expectedResult)
        })
      })

      context("And the crossOrigin options is set to `anonymous`", () => {
        it("Then it returns the extended options for every domain with `crossOrigin` set to `anonymous`", () => {
          const domainsObj = [
            { domain: "http://foo.com", crossOrigin: `anonymous` },
            { domain: "http://bar.com", crossOrigin: `anonymous` },
          ]

          const result = parseOptions(domainsObj)

          const expectedResult = [
            { domain: "http://foo.com", crossOrigin: `anonymous` },
            { domain: "http://bar.com", crossOrigin: `anonymous` },
          ]
          expect(result).to.deep.equal(expectedResult)
        })
      })

      context("And the crossOrigin options is set to `use-credentials`", () => {
        it("Then it returns the extended options for every domain with `crossOrigin` set to `use-credentials`", () => {
          const domainsObj = [
            { domain: "http://foo.com", crossOrigin: `use-credentials` },
            { domain: "http://bar.com", crossOrigin: `use-credentials` },
          ]

          const result = parseOptions(domainsObj)

          const expectedResult = [
            { domain: "http://foo.com", crossOrigin: `use-credentials` },
            { domain: "http://bar.com", crossOrigin: `use-credentials` },
          ]
          expect(result).to.deep.equal(expectedResult)
        })
      })

      context(
        "And the crossOrigin options is not set to a valid option",
        () => {
          it("Then it throws an error", () => {
            const domainsObj = [
              { domain: "http://foo.com", crossOrigin: `invalid-value` },
              { domain: "http://bar.com", crossOrigin: `invalid-value` },
            ]

            expect(() => parseOptions(domainsObj)).to.throw()
          })
        }
      )
    })
  })
})

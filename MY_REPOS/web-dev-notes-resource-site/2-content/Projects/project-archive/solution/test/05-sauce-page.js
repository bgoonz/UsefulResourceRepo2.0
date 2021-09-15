const chai = require("chai");
const cheerio = require("cheerio");
const request = require("supertest");

const haveTag = require("./utils/have-tag-with-attribute");
const haveSelectWithOption = require("./utils/have-select-with-option");
const htmlCollector = require("./utils/html-collector");

const { app } = require("../app.js");
const { expect } = chai;

chai.use(haveTag);
chai.use(haveSelectWithOption);

describe("The sauce page", () => {
  function randomName() {
    return (Math.random() * 1000).toString();
  }

  function randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  const pastas = [
    { label: 'Red Chili Ramen', description: 'spicy', taste: 9, sauce: 'Red Chili Broth', noodle: 'Ramen' },
    { label: 'Alfredo Linguini', description: 'creamy', taste: 8, sauce: 'Alfredo', noodle: 'Linguini' },
    { label: 'Alfredo Udon', description: 'creamy', taste: 3, sauce: 'Alfredo', noodle: 'Udon' },
    { label: 'Bolognese Linguini', description: 'creamy', taste: 7, sauce: 'Bolognese', noodle: 'Linguini' },
  ];
  let csrfError = null;
  let optionError = null;
  let createError = null;
  let pageContent = null;
  let noodleOptions = null;
  let sauceOptions = null;
  let alfredoId = null;

  function findNamedRow(label) {
    const rows = pageContent.split(/<\/?tr>/g);
    let namedRow = "";

    const nameRegex = new RegExp(`<td[^>]*>\s*${label}\s*</td>`);
    for (let row of rows) {
      if (nameRegex.test(row)) {
        namedRow = row;
        break;
      }
    }
    return namedRow;
  }

  before(async () => {
    if (!app) return;

    const getRes = await request(app).get("/pasta/create");
    const cookies = getRes.headers["set-cookie"];
    const $ = cheerio.load(getRes.text);

    try {
      const csrf = $("input[type='hidden'][name='_csrf']");
      if (csrf.length === 0) {
        csrfError = new Error("Could not find a _csrf field to use to submit.");
      }
      token = csrf.attr("value");
    } catch (e) {
      csrfError = new Error("Could not find a _csrf field to use to submit.");
      return;
    }

    try {
      noodleOptions = $('select[name="noodleId"] option');
      if (!noodleOptions.length) throw 'error';
    } catch (e) {
      optionError = new Error(
        "Could not find a select dropdown with noodles to use to submit."
      );
      return;
    }

    try {
      sauceOptions = $('select[name="sauceId"] option');
      if (!sauceOptions.length) throw "error";
    } catch (e) {
      optionError = new Error(
        "Could not find a select dropdown with sauces to use to submit."
      );
      return;
    }

    try {
      for (let i = 0; i < sauceOptions.length; i++) {
        const sauceOption = $(sauceOptions[i]);
        if (new RegExp("Alfredo").test(sauceOption.text())) {
          alfredoId = sauceOption.attr("value");
          break;
        }
      }
      if (!alfredoId) throw "No Alfredo sauce found";
    } catch(e) {
      optionError = new Error(
        "Could not find a select dropdown with Alfredo sauce to use to submit."
      );
      return;
    }

    try {
      for (let pasta of pastas) {
        const { label, description, taste, noodle, sauce } = pasta;
        let noodleId = null;
        let sauceId = null;
        for (let i = 0; i < noodleOptions.length; i++) {
          const noodleOption = $(noodleOptions[i]);
          if (new RegExp(noodle).test(noodleOption.text())) {
            noodleId = noodleOption.attr("value");
            pasta.noodleId = noodleId;
            break;
          }
        }
        for (let j = 0; j < sauceOptions.length; j++) {
          const sauceOption = $(sauceOptions[j]);
          if (new RegExp(sauce).test(sauceOption.text())) {
            sauceId = sauceOption.attr("value");
            pasta.sauceId = sauceId;
            break;
          }
        }

        await request(app)
          .post("/pasta/create")
          .set("Cookie", cookies)
          .send(`_csrf=${token}`)
          .send(`label=${label}`)
          .send(`description=${description}`)
          .send(`taste=${taste}`)
          .send(`noodleId=${noodleId}`)
          .send(`sauceId=${sauceId}`)
          .expect(302);
      }
    } catch (e) {
      createError = new Error(
        "Could not create new pastas to test on the main screen"
      );
    }
  });

  it("returns a 200", (done) => {
    if (!app) {
      return done('Cannot read "app" from app.js');
    }

    request(app)
      .get(`/sauce/${alfredoId}`)
      .set("accept", "html")
      .buffer()
      .parse(htmlCollector)
      .expect((res) => (pageContent = res.body))
      .expect(200, done);
  });

  describe("for some added pasta, Alfredo sauce page only shows pastas with Alfredo as their sauce", () => {
    it("the label", () => {
      if (!app) {
        return expect.fail('Cannot read "app" from app.js');
      }
      if (csrfError || optionError || createError) {
        return expect.fail(csrfError || optionError || createError);
      }

      for (let idx in pastas) {
        const { label, sauceId } = pastas[idx];
        if (alfredoId == sauceId) {
          const re = new RegExp(`<td[^>]*>\s*${label}\s*</td>`);
          expect(re.test(pageContent)).to.equal(
            true,
            `Could not find the label ${label} on the Alfredo sauce page.`
          );
        } else {
          const re = new RegExp(`<td[^>]*>\s*${label}\s*</td>`);
          expect(re.test(pageContent)).to.not.equal(
            true,
            `Found the label ${label} on the Alfredo sauce page.`
          );
        }
      }

    });

    it("the description", () => {
      if (!app) {
        return expect.fail('Cannot read "app" from app.js');
      }
      if (csrfError || optionError || createError) {
        return expect.fail(csrfError || optionError || createError);
      }

      for (let idx in pastas) {
        const { label, description, sauceId } = pastas[idx];
        if (alfredoId == sauceId) {
          let namedRow = findNamedRow(label);
          const re = new RegExp(`<td[^>]*>\s*${description}\s*</td>`);
          expect(re.test(namedRow)).to.equal(
            true,
            `Could not find the description ${description} on the same row as label ${label}.`
          );
        } else {
          let namedRow = findNamedRow(label);
          expect(namedRow).to.equal('', `Found the label ${label} on the Alfredo sauce page.`);
        }
      }
    });

    it("the taste", () => {
      if (!app) {
        return expect.fail('Cannot read "app" from app.js');
      }
      if (csrfError || optionError || createError) {
        return expect.fail(csrfError || optionError || createError);
      }

      for (let idx in pastas) {
        const { label, taste, sauceId } = pastas[idx];
        if (alfredoId == sauceId) {
          let namedRow = findNamedRow(label);
          const re = new RegExp(`<td[^>]*>\s*${taste}\s*</td>`);
          expect(re.test(namedRow)).to.equal(
            true,
            `Could not find the taste ${taste} on the same row as label ${label}.`
          );
        } else {
          let namedRow = findNamedRow(label);
          expect(namedRow).to.equal("", `Found the label ${label} on the Alfredo sauce page.`);
        }
      }
    });

    it("the noodle and a link to the noodle's page", () => {
      if (!app) {
        return expect.fail('Cannot read "app" from app.js');
      }
      if (csrfError || optionError || createError) {
        return expect.fail(csrfError || optionError || createError);
      }

      for (let idx in pastas) {
        const { label, noodleId, noodle, sauceId } = pastas[idx];
        if (alfredoId == sauceId) {
          let namedRow = findNamedRow(label);
          const $ = cheerio.load(namedRow);
          const re = new RegExp(noodle);
          expect(re.test(namedRow)).to.equal(
            true,
            `Could not find the noodle ${noodle} on the same row as label ${label}.`
          );
          const link = $(`a[href="/noodle/${noodleId}"]`);
          linkText = link.text();
          expect(re.test(linkText)).to.equal(
            true,
            `Could not find a link to the ${noodle} noodle's page.`
          );
        } else {
          let namedRow = findNamedRow(label);
          expect(namedRow).to.equal("", `Found the label ${label} on the Alfredo sauce page.`);
        }
      }
    });

    it("the sauce and a link to the sauce's page", () => {
      if (!app) {
        return expect.fail('Cannot read "app" from app.js');
      }
      if (csrfError || optionError || createError) {
        return expect.fail(csrfError || optionError || createError);
      }

      for (let idx in pastas) {
        const { label, sauceId, sauce } = pastas[idx];
        if (alfredoId == sauceId) {
          let namedRow = findNamedRow(label);
          const $ = cheerio.load(namedRow);
          const re = new RegExp(sauce);
          expect(re.test(namedRow)).to.equal(
            true,
            `Could not find the sauce ${sauce} on the same row as label ${label}.`
          );
          const link = $(`a[href="/sauce/${sauceId}"]`);
          linkText = link.text();
          expect(re.test(linkText)).to.equal(
            true,
            `Could not find a link to the ${sauce} sauce's page.`
          );
        } else {
          let namedRow = findNamedRow(label);
          expect(namedRow).to.equal("", `Found the label ${label} on the Alfredo sauce page.`);
        }
      }
    });
  });
});


const { describe, it } = require('mocha');
const { expect } = require('chai');
const request = require('supertest');
const cheerio = require('cheerio');

let $ = null;

/**
 * Checks the page's `<h2>` heading.
 * @param {string} headingText - The expected `<h2>` element text content.
 * @param {number} level - The expected heading level.
 */
const checkHeading = (headingText, level = 2) => {
  it(`should render an \`<h${level}>\` heading containing the text "${headingText}"`, () => {
    const heading = $(`h${level}`);
    expect(heading.text()).to.equal(headingText);
  });
};

/**
 * Checks a form text field (i.e. `<input type="text" />`).
 * @param {object} park - An object literal with properties
 * that align with the `Park` Sequelize model properties.
 * @param {string} name - The expected `name` of the input element.
 * @param {string} placeholder - The optional placeholder text.
 */
const checkTextField = (park, name, placeholder) => {
  const value = park[name];

  let assertionMessage = `a text field (\`<input>\` element) with a \`name\` attribute set to "${name}"`;
  if (placeholder !== undefined) {
    assertionMessage += ` and a \`placeholder\` attribute set to "${placeholder}"`;
  }
  if (value !== undefined) {
    assertionMessage += ` and a \`value\` attribute set to "${value}"`;
  }

  it(assertionMessage, () => {
    const element = $(`form input[name="${name}"]`);
    expect(element.length).to.equal(1);
    expect(element.attr('type')).to.equal('text');
    if (placeholder !== undefined) {
      expect(element.attr('placeholder')).to.equal(placeholder);
    }
    if (value !== undefined) {
      expect(element.attr('value')).to.equal(park[name]);
    }
  });
};

/**
 * Checks the HTML form.
 * @param {string} formAction - The expected form `action` attribute.
 * @param {string} submitButtonText - The expected submit button text.
 * @param {string} cancelHyperlinkHREF - The expected "Cancel" hyperlink `href` attribute value.
 * @param {function} checkFields - The function to check the form fields.
 */
const checkForm = (formAction, submitButtonText, cancelHyperlinkHREF, checkFields = null) => {
  describe('should render a form (`<form>` element)', () => {
    it(`with an \`action\` attribute set to "${formAction}" and a \`method\` attribute set to "post"`, () => {
      const form = $('form');
      expect(form.length).to.equal(1);
      expect(form.attr('action')).to.equal(formAction);
      expect(form.attr('method')).to.equal('post');
    });

    describe('containing', () => {
      it('a hidden field (`<input>` element) with a `name` attribute set to "_csrf" and a `value` attribute set to a CSRF token', () => {
        const element = $('form input[name="_csrf"]');
        expect(element.length).to.equal(1);
        expect(element.attr('type')).to.equal('hidden');
        expect(element.attr('value')).to.not.be.empty;
      });

      if (checkFields !== null) {
        checkFields();
      }

      it(`an "${submitButtonText}" button (\`button\` element) with a \`type\` attribute set to "submit"`, () => {
        const element = $('form button[type="submit"]');
        expect(element.length).to.equal(1);
        expect(element.text()).to.be.equal(submitButtonText);
      });

      it(`a "Cancel" hyperlink (\`<a>\` element) with an \`href\` attribute set to "${cancelHyperlinkHREF}"`, () => {
        const element = $(`form a[href="${cancelHyperlinkHREF}"]`);
        expect(element.length).to.equal(1);
        expect(element.text()).to.equal('Cancel');
      });
    });
  });
};

/**
 * Checks the HTML form.
 * @param {string} formAction - The expected form `action` attribute.
 * @param {string} submitButtonText - The expected submit button text.
 * @param {string} cancelHyperlinkHREF - The expected "Cancel" hyperlink `href` attribute value.
 * @param {object} park - An object literal with properties
 * that align with the `Park` Sequelize model properties.
 */
const checkParkForm = (formAction, submitButtonText, cancelHyperlinkHREF, park) => {
  const fields = () => {
    checkTextField(park, 'parkName');
    checkTextField(park, 'city');
    checkTextField(park, 'provinceState');
    checkTextField(park, 'country');
    checkTextField(park, 'opened', 'ex: 2000-01-31');
    checkTextField(park, 'size');

    it('a text area field (`<textarea>` element) with a `name` attribute set to "description"', () => {
      const element = $('form textarea[name="description"]');
      expect(element.length).to.equal(1);
      expect(element.text()).to.equal(park.description);
    });
  };

  checkForm(formAction, submitButtonText, cancelHyperlinkHREF, fields);
};

/**
 * Checks to see if the provided validation error message
 * is rendered in the validation summary section of the page.
 * @param {string} message - The validation error message to check for.
 */
const checkValidationMessage = (message) => {
  it(`a validation message containing the text "${message}"`, () => {
    let element = null;
    $('div ul li').each(function() {
      const elementText = $(this).text();
      if (elementText === message) {
        element = this;
      }
    });
    expect(element).to.not.be.null;
  });
};

/**
 * Loads the response text into a Cheerio object
 * and sets an internal reference in the `form` module
 * so the form helper methods have access to the DOM elements.
 * @param {object} response - The SuperTest response.
 */
const setDomElements = (response) => {
  $ = cheerio.load(response.text);
  return $;
};

/**
 * Sends a POST request to the server
 * after sending a GET request to get the CSRF token
 * and response HTTP cookie from the server.
 * @param {string} path - The request route path.
 * @param {module} app - The `app` module.
 * @param {object} data - An object literal with properties
 * to send to the server as the body for the POST request.
 * @param {regex} responseContentType - The expected
 * response content type.
 * @param {string} responseLocation - The expected
 * response location (used for checking a redirect response).
 * @param {number} responseStatusCode - The expected
 * response status code.
 */
const postRequestWithCSRFToken = async (path, app, data,
  responseContentType = /html/, responseLocation = null, responseStatusCode = 200) => {
  const agent = request.agent(app);

  // Make a `GET` request.
  const getResponse = await agent
    .get(path)
    .expect('Content-type', /html/)
    .expect(200);

  // Get the `_csurf` input field value.
  const $1 = cheerio.load(getResponse.text);
  const csrfToken = $1('form input[name="_csrf"]')
    .attr('value');

  const requestBodyData = { _csrf: csrfToken, ...data };
  const requestBody = Object.keys(requestBodyData)
    .map((key) => `${key}=${encodeURIComponent(requestBodyData[key])}`)
    .join('&');

  // Make a `POST` request.
  let postResponse = null;

  if (responseLocation !== null) {
    postResponse = await agent
      .post(path)
      .send(requestBody)
      .expect('Content-type', responseContentType)
      .expect('Location', responseLocation)
      .expect(responseStatusCode);
  } else {
    postResponse = await agent
      .post(path)
      .send(requestBody)
      .expect('Content-type', responseContentType)
      .expect(responseStatusCode);
  }

  setDomElements(postResponse);

  return postResponse;
};

module.exports = {
  checkHeading,
  checkTextField,
  checkForm,
  checkParkForm,
  checkValidationMessage,
  postRequestWithCSRFToken,
  setDomElements,
};

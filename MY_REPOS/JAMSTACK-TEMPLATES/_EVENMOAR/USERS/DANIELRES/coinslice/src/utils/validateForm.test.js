// @flow
import Joi from "joi-browser";

import validateForm from "./validateForm";

it("Returns errors on invalid input", () => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    age: Joi.number().required(),
  });

  const formData = {};
  const expected = {
    age: '"age" is required',
    name: '"name" is required',
  };

  expect(validateForm(formData, schema)).toEqual(expected);
});

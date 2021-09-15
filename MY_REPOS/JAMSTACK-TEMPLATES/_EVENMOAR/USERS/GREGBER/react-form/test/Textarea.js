import {Textarea} from '../src';
import setup from './utils/setup';
import commonTests from './utils/templates/common';
import inputValidationsTest from './utils/templates/inputValidations';
import inputOnChangeTest from './utils/templates/inputOnChange';
import maxLengthTest from './utils/templates/maxLengthAttribute';
import rowsTest from './utils/templates/rowsAttribute';
import placeholderTest from './utils/templates/placeholderAttribute';

describe('Textarea', () => {
  const Component = Textarea;
  const element = 'textarea';

  setup();
  commonTests({Component, element});
  inputValidationsTest({Component, element});
  inputOnChangeTest({Component, element});
  placeholderTest({Component, element});
  maxLengthTest({Component, element});
  rowsTest({Component, element});
});

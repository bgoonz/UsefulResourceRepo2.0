import {Input} from '../src';
import setup from './utils/setup';
import commonTests from './utils/templates/common';
import inputValidationsTest from './utils/templates/inputValidations';
import inputOnChangeTest from './utils/templates/inputOnChange';
import typeTest from './utils/templates/typeAttribute';
import maxLengthTest from './utils/templates/maxLengthAttribute';
import placeholderTest from './utils/templates/placeholderAttribute';
import addonsTest from './utils/templates/addons';

describe('Input', () => {
  const Component = Input;
  const element = 'input';

  setup();
  commonTests({Component, element});
  inputValidationsTest({Component, element});
  inputOnChangeTest({Component, element});
  placeholderTest({Component, element});
  maxLengthTest({Component, element});
  typeTest({Component, element});
  addonsTest({Component, element});
});

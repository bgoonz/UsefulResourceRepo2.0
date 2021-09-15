import {Select} from '../src';
import setup from './utils/setup';
import commonTests from './utils/templates/common';
import selectValidationsTest from './utils/templates/selectValidations';
import selectOnChangeTest from './utils/templates/selectOnChange';
import selectOptionsTest from './utils/templates/selectOptions';
import selectPlaceholderTest from './utils/templates/selectPlaceholder';

describe('Select', () => {
  const Component = Select;
  const element = 'select';

  setup();
  commonTests({Component, element});
  selectOptionsTest({Component, element});
  selectOnChangeTest({Component, element});
  selectValidationsTest({Component, element});
  selectPlaceholderTest({Component, element});
});

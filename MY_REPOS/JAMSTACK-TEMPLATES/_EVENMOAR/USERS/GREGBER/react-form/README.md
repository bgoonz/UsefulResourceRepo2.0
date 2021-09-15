# react-form
[![Build Status](https://travis-ci.org/doctolib/react-form.svg?branch=master)](https://travis-ci.org/doctolib/react-form)
[![Coverage Status](https://coveralls.io/repos/doctolib/react-form/badge.svg?branch=master&service=github)](https://coveralls.io/github/doctolib/react-form?branch=master)
[![Dependency Status](https://david-dm.org/doctolib/react-form.svg?theme=shields.io)](https://david-dm.org/doctolib/react-form)
[![devDependency Status](https://david-dm.org/doctolib/react-form/dev-status.svg?theme=shields.io)](https://david-dm.org/doctolib/react-form#info=devDependencies)

Set of React form components based on react-formsy.

## Install

```
npm install @doctolib/react-form
```

## Usage

### Form

Refer to [formsy-react](https://github.com/christianalfoni/formsy-react#how-to-use).

```js
import {Form} from '@doctolib/react-form';
const Component = () => <Form/>;
```

### HOC

Wrapper used to create custom control compatible with react-form validation.
All props, states and methods are accessible via props in the wrapped component.

```js
import {HOC} from '@doctolib/react-form';
const Component = HOC((...props) => <input {...props} />);
```

### Input

Input component.

```js
import {Input} from '@doctolib/react-form';
const Component = () => <Input name="firstname"/>;
```

### Textarea

Textarea component.

```js
import {Textarea} from '@doctolib/react-form';
const Component = () => <Textarea name="comment"/>;
```

### Select

Select component.

```js
import {Select} from '@doctolib/react-form';
const Component = () => <Select options={{value: 'Label'}} name="select"/>;
```

### InputAddon

Addon for input.

```js
import {Input, InputAddon} from '@doctolib/react-form';
const Component = () => (
  <Input
    name="firstname"
    leftAddon={<InputAddon>hey</InputAddon>}
    rightAddon={<InputAddon>you</InputAddon>}
  />
);
```

### RadioGroup

Group of radios.

```js
import {RadioGroup} from '@doctolib/react-form';
const Component = () => (
  <RadioGroup
    name="radio"
    options={{value: 'Label'}}
  />
);
```

### CheckboxGroup

Group of checkboxes.

```js
import {CheckboxGroup} from '@doctolib/react-form';
const Component = () => (
  <CheckboxGroup
    name="checkbox"
    options={{value: 'Label'}}
  />
);
```


## License

MIT

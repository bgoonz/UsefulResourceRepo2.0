## CopyButton

This component renders a button that copies text to clipboard.

Built on the basis of [`Button`](??path=/story/core-button--variants).

```javascript
import { CopyButton } from "gatsby-interface"

function Component() {
  return <CopyButton content="Hello world!" />
}
```

### Props

`CopyButton` accepts all props accepted by `Button` component as well as these props:

| Prop           | Type                          | Default value                                                    | Description                                                                                   |
| -------------- | ----------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| content        | `string`                      |                                                                  | Required, a string to be copied to clipboard on button click                                  |
| getButtonLabel | `(copied: boolean) => string` | `copied => copied ? 'Copied' : 'Copy'`                           | Button label                                                                                  |
| getButtonTitle | `(copied: boolean) => string` | `copied => copied ? 'Copied to clipboard' : 'Copy to clipboard'` | Button title                                                                                  |
| delay          | `number`                      | `5000`                                                           | How many milliseconds before the button returns to its initiall state after user clicks on it |

# Icons

## Usage

```jsx
import { CheckIcon } from "gatsby-interface"

function MyComponent() {
  return (
    <div style={{ color: "#333" }}>
      Lorem ipsum <CheckIcon />
    </div>
  )
}
```

## Props

Each icon accepts all props supported by `<svg />` element as well as these props:

| prop | type                                         | default   | description      |
| ---- | -------------------------------------------- | --------- | ---------------- |
| size | `'xsmall'`, `'small'`, `'medium'`, `'large'` | `'small'` | Size of the icon |

## How does it work

### Icon color

By default, icons inherit the current text color from its parent. However, you can provide your own color by passing `color` prop:

```jsx
<CheckIcon color="#454545" />
```

### Icon size

In addition to using `size` prop it is possible to set an icon's size to a different value. Since each icon is just an SVG element, you can pass `height` and `width` props to change its size:

```jsx
<CheckIcon height="2rem" width="2rem" />
```

## Adding new icons

Suppose we want to add a `MyAwesomeIcon` component:

1. Run `yarn scaffold:icon MyAwesomeIcon` (`MyAwesome` or `my-awesome` also work) from the root directory of this repo. It will add a `MyAwesomeIcon.js` file in this directory and export this component in [`icons.js`](./icons.js) file.
1. Open `MyAwesomeIcon.js` in your IDE. It should look something like this:

   ```typescript jsx
   import React from "react"
   import IconSkeleton from "./IconSkeleton"
   import { IconProps } from "./types"

   export default function MyAwesomeIcon(props: IconProps) {
     return (
       <IconSkeleton {...props} iconName="MyAwesomeIcon">
         {/* insert inner SVG code here */}
       </IconSkeleton>
     )
   }
   ```

1. Get the SVG for the new icon from Figma and copy the code from **inside** the `<svg>` element in place of `{/* insert inner SVG code here */}` in the code above.
1. Cleanup the inserted code:
   - Replace kebab-case prop names (e.g. `stroke-linecap`) with camelCase (`strokeLinecap`).
   - Remove any unnecessary `id` props. If any `id` is left, make sure it is unique (e.g. `my-awesome-icon-gradient-${color}`).
1. See what props are used to set the draw color; it can be either `stroke` or `fill`. If it is `fill` then pass `applyColorToStroke={false}` to `<IconContainer />`. Then remove all `fill`/`stroke` props so that the icon can inherit the color from its parent.

That's it! No need to write any tests or stories as they are added automatically for every component exported by [`icons.js`](./icons.js).

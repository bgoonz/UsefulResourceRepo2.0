# TypeScript guidelines

This document's goal is to provide some guidelines and suggestions on using TypeScript when working on components in `gatsby-interface`.

##### Table of Contents

- [Prop Types](#prop-types)
  - [Naming](#naming)
  - [Optional props](#optional-props)
  - [Always export prop types](#always-export-prop-types)
  - [ReactNode](#reactnode)
  - [Be strict](#be-strict)
  - [Mirror HTML attributes](#mirror-html-attributes)
  - [Avoid conditional prop types](#avoid-conditional-prop-types)
- [React Hooks](#react-hooks)
  - [useState](#usestate)
  - [useCallback](#usecallback)
  - [useRef](#useref)
- [React Types](#react-types)
  - [React.FC](#reactfc)
  - [React.forwardRef](#reactforwardRef)
  - [Event handlers](#event-handlers)
  - [Context](#context)
- [Emotion](#emotion)
- [Typing Third-party Libraries](#typing-third-party-libraries)

## Prop Types

TypeScript provides an alternative to [prop-types](https://github.com/facebook/prop-types) library when it comes to declaring types for a component props.

There are several differences between the two:

- Type checks with TypeScript are performed during **compilation**, while `prop-types` performs runtime validation
- TypeScript **forces** developers to provide types to their components props, otherwise the code just won't compile
- TypeScript provides better support for typing functions, while with `prop-types` we can only use `PropTypes.func` type
- TypeScript provides better ecosystem for types: we can extend them, use a partial type, declare a union type, export a type, use generics and enums etc

Here are some general rules for writing a type for component props:

### Naming

A TypeScript type for a component should be name `[componentName]Props`, e.g. `MyComponent` should have props named `MyComponentProps`.

### Optional props

If some prop is not considered required for your component, you can use `?` to [mark it as optional](https://www.typescriptlang.org/docs/handbook/interfaces.html#optional-properties) in prop types. This approach is different to `prop-types` library where you mark props as required.

```typescript
type MyDateSelectorProps = {
  value: string // required
  onChange: (value: string) => void // required
  mode?: "input" | "widget" // optional, same as "input" | "widget" | undefined
}
```

### Always export prop types

1. If a component is exported, the type should be exported as well. This allows other components to use this type in their own prop types. If the type uses some enum types, it usually makes sense to export them as well.

```tsx
// MyComponentProps and MyComponentVariant types are exported

export type MyComponentProps = {
  content: string
  variant: MyComponentVariant
}

export type MyComponentVariant = "foo" | "bar"

export default function MyComponent(props: MyComponentProps) {
  /* ... */
}
```

### ReactNode

`React.ReactNode` is a React type which covers everything that can be used as a `children` prop. Therefore, it's better to use this type for any kind of prop that gets rendered as a child in an HTML node and resort to strings only if it can or must be used as an attribute. For example:

```tsx
export type PageTitleProps = {
  title: React.ReactNode
  subtitle?: React.ReactNode
}

export default function PageTitle({ title, subtitle }) {
  return (
    <h1>
      {title}
      {subtitle && <small>{subtitle}</small>}
    </h1>
  )
}
```

The reason for this is components can be used not only to style and/or compose elements, but also to render a transformed value. Take [react-intl](https://github.com/formatjs/react-intl/), for example: it exposes a [FormattedMessage](https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage) component which is used to display translated text. If our example above only allowed `title` and `subtitle` as strings, a consumer application would not be able to use `PageTitle` like this:

```jsx
import { PageTitle } from "gatsby-interface"
import { FormattedMessage } from "react-intl"

export default function HomePageTitle({ title, subtitle }) {
  return (
    <h1>
      <PageTitle
        title={<FormattedMessage id="homePage.title" />}
        subtitle={<FormattedMessage id="homePage.subtitle" />}
      />
    </h1>
  )
}
```

### Be strict

Try to be as strict as possible when declaring types for your props. Avoid using `any` or `unknown` types as well as `Function` or `object` anywhere but development-related code (i.e. tests, stories and WIP code). If your component renders a button which calls `handleButtonClick` prop when clicked, then it should have either of these type declarations:

```tsx
export type MyComponentWithButtonProps = {
  handleButtonClick: () => {} // implies that the consumer component does not care about the click event
}
```

or

```tsx
export type MyComponentWithButtonProps = {
  handleButtonClick: React.MouseEventHandler<HTMLButtonElement> // allows the consumer component to access the event
}
```

### Mirror HTML attributes

If your component is just a wrapper for a HTML element, its prop types should be based on the attributes supported by that element. This can be achieved with `JSX.IntrinsicElements` type:

```tsx
export type MyLogButtonProps = Omit<JSX.IntrinsicElements["button"], "ref">

export default function MyLogButton({ onClick, ...rest }: MyLogButtonProps) {
  return (
    <button
      onClick={e => {
        console.log(e)
        onClick && onClick(e)
      }}
      {...rest}
    />
  )
}
```

**NOTE:** remember to omit `ref` from JSX.IntrinsicElements since your component does not actually handle refs.

### Avoid conditional prop types

In some cases it is tempting to create a component that renders different components with different props based on some subset of its own props. Naturally, a component like this will have to either calculate relevant props itself or allow passing them from a parent component. Here are examples to illustrate both cases:

```tsx
type MyDateSelectorProps = {
  value: string
  onChange: (value: string) => void
  mode?: "input" | "widget"
}

// Passed "mode" prop is used to provide different "onChange" props for <input /> and <DatePickerWidget />
function MyDateSelector({
  value,
  onChange,
  mode = "widget",
}: MyDateSelectorProps) {
  if (mode === "input") {
    return (
      <input
        type="date"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    )
  }
  return <DatePickerWidget value={value} onChange={onChange} />
}
```

and

```tsx
type MyButtonLookalikeProps = Omit<
  JSX.IntrinsicElements["a"] & JSX.IntrinsicElements["button"],
  "ref"
>

// The component just passes ...rest to <a /> and <button />
function MyButtonLookalike({ href, ...rest }: MyButtonLookalikeProps) {
  if (href) {
    return <a href={href} {...rest} className="my-btn" />
  }
  return <button {...rest} className="my-btn" />
}
```

The second case won't even compile since `rest` may contain attributes not recognized by `<button />` such as `rel` and `target`.
It is possible to have conditional prop types with TypeScript; however, it usually makes more sense to see if the component actually needs that. In our example above, a `MyButtonLookalike` is used to render either an anchor link or a button, and both of them should look like a button. Yet this makes the component more ambiguous since we'd have to look at the props to see what will be actually rendered:

```jsx
// In this case we can't even know what gets rendered - is it always a button? an anchor?
function TextWithButton({ text, ...rest }: MyButtonLookalikeProps & { text: string }) {
    return (
        <p>
            {text}
            <MyButtonLookalike {...rest}>
        </p>
    )
}
```

Instead, we can split this component in two and extract the shared styles logic:

```tsx
function getButtonStyles(): { className: string } {
  return {
    className: "my-btn",
  }
}

type MyButtonProps = Omit<JSX.IntrinsicElements["button"], "ref">

function MyButton(props: MyButtonProps) {
  return <button {...props} {...getButtonStyles()} />
}

type MyAnchorButtonProps = Omit<JSX.IntrinsicElements["a"], "ref">

function MyAnchorButton(props: MyAnchorButtonProps) {
  return <a {...props} {...getButtonStyles()} />
}
```

## React Hooks

### useState

```typescript
/*
 * useState can infer types for "step" and "setStep" from the default value type
 * However, an explicit declaration makes the code more clear to other contributors
 */
const [step, setStep] = React.useState<number>(1)
```

### useCallback

```typescript
/*
 * Declare types the same way you would do it for an arrow function
 */
const onRemove = React.useCallback((itemId: string) => {
  /* ... */
}, [])

// or, if there is a type alias for this type of functions:
type RemoveHandler = (itemId: string) => void

const onRemove = React.useCallback<RemoveHandler>(itemId => {
  /* ... */
}, [])

// event handlers
const onFocus = React.useCallback<React.FocusEventHandler<HTMLInputElement>>(
  e => {
    /* ... */
  },
  []
)
```

### useRef

- The type that you provide will be used for `ref.current`, not for the `ref` itself!
- Passing `null` as default value to `useRef` makes TypeScript treat the ref as **readonly**

```tsx
const ref = React.useRef<HTMLButtonElement>(null)

return <button ref={ref}>Click me!</button>
```

## React types

### React.FC

If you're a fan of declaring components as arrow functions, you can use a shortcut `React.FC<T>` &mdash; it injects `children: React.ReactNode` into the type `T` that you provide and provides a return type. So, instead of writing

```typescript
export type MyComponentProps = {
  children?: React.ReactNode
  someRandomNumber: number
}

function MyComponent({ children, someRandomNumber }: MyComponentProps) {
  /* ... */
}
```

you could have

```typescript
export type MyComponentProps = {
    someRandomNumber: number;
}

const MyComponent: React.FC<MyComponentProps> = ({ children, someRandomNumber }: MyComponentProps) {
    /* ... */
}

export default MyComponent
```

However, this can mess up prop types for components that import `MyComponentProps` since they might expect that `children` would be there which isn't true for the second case.

### React.forwardRef

`React.forwardRef` accepts two generic types: ref type and prop types:

```typescript
export type MyToggleProps = {
  id: string
  label: React.ReactNode
  onToggle: (value: boolean) => void
}

const MyToggle = React.forwardRef<HTMLInputElement, MyToggleProps>(
  ({ id, label, onToggle }, ref) => {
    return (
      <React.Fragment>
        <input
          id={id}
          ref={ref}
          type="checkbox"
          onChange={e => onToggle(!e.target.checked)}
        />
        <label htmlFor={id}>{label}</label>
      </React.Fragment>
    )
  }
)

export default MyToggle
```

### Event handlers

React has type aliases for basically all `onX` props that can be used on native HTML elements. Here are some examples (generic type `<T>` usually refers to the element that the event is attached to, i.e. `e.currentTarget`):

- `onClick`, `onMouseEnter`, `onMouseLeave`, `onMouseDown` etc &mdash; `React.MouseEventHandler<T>`
- `onFocus`, `onBlur` &mdash; `React.FocusEventHandler<T>`
- `onChange` for `input`, `select` and `textarea` &mdash; `React.ChangeEventHandler<T>`
- `onSubmit` &mdash; `React.FormEventHandler<T>`

You can use these aliases in your prop types for props.

### Context

Typing React context is pretty straightforward: `React.createContext` is a generic function in TypeScript that accepts a type for the context value. Just provide that type and it will be inferred by context provider and consumers. For example, this is how a `ToastContext` would be defined in TS:

```typescript
// Type for the context value
export type ToastContextValue = {
  showToast: (message: React.ReactNode, options?: ToastOptions) => void
}

export type ToastOptions = {
  tone?: "SUCCESS" | "DANGER"
  timeout?: number
}

// Pass ToastContextValue to generic React.createContext
export const ToastContext = React.createContext<ToastContextValue>({
  showToast: () => {}, // default context value must respect the type
})

/*
 * TypeScript will infer the props types ("value") for ToastContext.Provider from ToastContext
 */
export const ToastProvider = ToastContext.Provider

/*
 * TypeScript will infer the type for ToastContext.Consumer render function from ToastContext
 */
export const ToastConsumer = ToastContext.Consumer

/*
 * TypeScript will infer the return type for from React.useContext
 * which in turn infers it from ToastContext
 */
export function useToast() {
  return React.useContext(ToastContext)
}
```

## Emotion

It is possible to provide prop types for your `styled` components:

```typescript
export const MorpheusPill = styled("div")<{ isMatrixPill: boolean }>`
  color: ${props => (props.isMatrixPill ? "red" : "blue")};
`
```

However, it might be better to extract those types in the same way as we do for other prop types:

```typescript
export type MorpheusPillProps = {
  isMatrixPill: boolean
}

export const MorpheusPill = styled("div")<MorpheusPillProps>`
  color: ${props => (props.isMatrixPill ? "red" : "blue")};
`
```

This approach is also helpful if you're using VSCode and [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components) plugin since it only works if the template string starts on the same line as the `styled`/`css` call.
If we would leave the type declaration in the generic, our code might be prettified into something like this:

```typescript
export const MorpheusPill = styled("div")<{
  isMatrixPill: boolean // this would break vscode-styled-components
}>`
  color: ${props => (props.isMatrixPill ? "red" : "blue")};
`
```

## Typing Third-party Libraries

Many of JavaScript libraries out there do provide typings either as part of the package itself or available as [@types/library-name](https://github.com/DefinitelyTyped/DefinitelyTyped). However, some libraries still have no types exposed. The lack of type definitions for third-party libraries must never stop us from using those libraries, but luckily there is a workaround for this: just add a broad type definition in the [/src/typings.d.ts](/src/typings.d.ts) file, e.g.:

```typescript
declare module "@xstyled/system"
```

If the library is used extensively in our code then we could try to provide our own typings if it is not too difficult or time-consuming. For example:

```typescript
declare module "@xstyled/styled-components" {
  import styled, {
    css as styledCss,
    createGlobalStyle as styledCreateGlobalStyle,
  } from "styled-components"

  export default styled
  export const css: typeof styledCss
  export const createGlobalStyle: typeof styledCreateGlobalStyle
}
```

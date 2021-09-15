# HoC (pattern) vs Render Props (pattern) vs Hooks (not pattern, a new API)

Someone was asking me about comparing the HoC and Render Props patterns (and their shortcomings) to hooks. I might leave this up as a public gist for others if it's helpful.

<hr />

tldr;

Issues with HoC:

- Prop Collisions (sometimes)
- Can't use the HoC twice
- Indirection
- Composing happens at build-time (can cause issues)

Issues with Render Props

- Ugly (deep nesting)
- Scoping Issues (sometimes)

Hooks solve all the issues that both HoC's and Render Props Have.

<hr />

Some main points we need to understand first:

1. In React, it's really easy to create re-usable JSX. Just take your component and its JSX you want to share and make it a child component:

```jsx
function MyComponent() {
  return (
    <div className="browse-users">
      <div className="user-item">Name: Brad</div>
      <div className="user-item">Name: Ryan</div>
      <div className="user-item">Name: Nathan</div>
    </div>
  )
}

// Can be refactored to
function MyComponent() {
  return (
    <div className="browse-users">
      <UserItem name={Brad}>
      <UserItem name={Ryan}>
      <UserItem name={Nathan}>
    </div>
  )
}
```

But it's not so obvious how to make our state and lifecycle methods re-usable. Imagine a class-based component having state and lifecycle methods that orchestrate the state - because these are methods in a class, we can't just "share" these methods with other classes - and btw in React, making our own base component to extend (thinking in terms of inheritance as if we're doing OOP) is NOT a good idea in React.

So, two patterns were created by the community: Higher Order Components (HoC) and Render Props

2. HoC and Render Props are "design patterns" which means they aren't things that are "built into" the React library, they're more like "strategies" for writing code. Whereas Hooks is a new tool (API) that we have which is provided by React itself. One of the goals of hooks is to make state and the code that orchestrates it (not called lifecycles in hooks but similar idea) reusable.

So you can think of hooks as being a "more official" way now to abstract re-usable state/functionality whereas all we had before were patterns because React didn't have an official way

Understanding these two main points is required before we continue.

<hr />

## HoC

HoC's are a way of composing two components together - a parent and a child. When we have a file like this:

```jsx
// File: MyComponent.js
import React from "react";

function MyComponent({ props, from, HoC }) {
  // ...
}

export default someHocFunction(MyComponent);
//             ^^^^^ this function is the HoC
```

It seems like the thing we're exporting is `MyComponent`. Afterall, the file is called `MyComponent.js` and when we import this thing, we do so like this: `import MyComponent from './MyComponent`. But if you look closely, we're really exporting whatever the return value of the HoC function is. HoC's take your component you pass in and they wrap it in a parent component. They give you that parent component back with your component as the child. It's very important to realise that when we do `<MyComponent />`, the "MyComponent" part is actually the parent wrapper from the HoC and not exacly the "MyComponent" that we wrote. That's okay because the parent wrapper is going to in turn render our "MyComponent" as it's child. Let's continue.

The parent component provided by the HoC is what has the re-usable state and functionality. That parent component gives the child component access to the state and functionality via props.

By reusable, I mean we can do this:

```js
// MyMenu.js
export default withToggle(MyMenu)

// ActivateUser.js
export default withToggle(ActivateUser)
```

Imagine we had two files, one for a menu and one for activating users. Both need the ability to "toggle" something on and off. Each uses a `withToggle` HoC to handle the toggling state and functionality.

If we understand this much about HoC's we can start to talk about their shortcomings.

#### 1. Prop Collisions

The first and most obvious shortcoming of HoC is "prop collisions". If you carefully read what I said above, you'll realize that when we do this:

```jsx
<MyComponent name="Brad" />
```

We're actually passing the prop `name` to the parent "wrapper component" that was provided by the HoC -- we're not passing name to what we think which is the `MyComponent` that we wrote. Technically, it's the job of the HoC to forward those props on to it's child which is the real `MyComponent` that we wrote, so it _feels_ like doing `<MyComponent name="Brad" />` is working directly with our `MyComponent`, but there is this middle-man component which is that parent from the HoC.

This means we could have "prop collisions" between what we want to pass into `MyComponent` and what the HoC wants to pass in. What if we pass `name` but the HoC also wants to pass in a prop called `name`. This might not happen often, but it can happen and will cause bugs in your code. This problem does not exist with Render Props or Hooks as we'll see later on.

When it comes to prop collisions, one can easily say "well it doesn't happen often and I can just rename my prop to not collide with the one the HoC is giving, problem solved". But often times we need to compose several pieces of re-usable code into our component:

```jsx
export default someHoC(anotherHoc(coolHoc(MyComponent)));
```

This might look a little strange, but it does work. You can wrap your `MyComponent` in more than one HoC at the same time. This just means your `MyComponent` will have lots of "parents" that are each providing different abstractions for state and functionality. Remember, the way our HoC gives us access to that functionality is via props. Can you honestly look at those three HoC's and tell me for sure that none of them use the same prop names as the others? Obviously you cannot.

#### 2. Can't use the HoC twice

As we just saw, you can use more than one HoC on a component. It's actually very useful for our component to be able to use several abstractions at one, but what if we want the same HoC twice?

```jsx
export default withToggle(withToggle(MyComponent));
```

What if `MyComponent` needs to have two different things that toggle. Now we have a big problem because we will certainly 100% get prop collisions.

#### 3. Indirection

Speaking of those props being passed in, let's take a look at the props that `MyComponent` receives:

```jsx
function MyComponent({
  name,
  onClick,
  setValue,
  time,
  date,
  isActive,
  isRemoved,
}) {
  // ...
}

export default someHoC(anotherHoc(coolHoc(MyComponent)));
```

Can you tell me which of those props are coming from which HoC? Which props are not coming from the HoC's and you're supposed to add yourself like `<MyComponent name="Brad" />`?

#### 4. Composing at build-time

HoC's compose at build time. What I mean is:

```jsx
export default someHoC("Some Value", MyComponent);
```

Sometimes it might be nice to pass in other values to your HoC along with your component. But since this value is passed in at build time before `MyComponent` is turned into an element, we cannot use the props passed into `MyComponent` as arguments to the HoC. Let me explain.

Let's say you write a bunch of React and you're seeing that in many cases components just need to make one network request and then save the response into state so it can be used in the JSX. You decide to get clever and make this:

```jsx
export default fetchData("/users", BrowseUsers);
```

Your `fetchData` HoC will take the first argument and will do a network request to get the information at `/users` and then it will take the results and send them into `BrowseUsers`. Sounds cool right? Now you don't have to go around programming that same pattern of "componentDidMount, fetch data, setState, use state in JSX"

It all seems cool at first, but then later you realize that you have a component like this:

```jsx
<UserProfile uid={5} />
```

You want to do this:

```jsx
function UserProfile({ uid }) {
  // ...
}

export default fetchData("/users/???", UserProfile);
```

But do you see the problem? The moment that you have access to the prop `uid` which is `5` now but could be anything later is something that is too dynamic to plug into our path for fetching users. How do I get the value `5` into the path where I have `???`

## Render Props

Render Props is considered to be an alternative pattern to HoC. The premise of a Render Prop is similar though in that it also creates a parent wrapper that has the reusable state/functions - but it doesn't do this as a wrapper to our component:

```jsx
function MyComponent() {
  return (
    <div>
      <h1>My Page</h1>
      <Toggle
        render={(on, toggle) => {
          return (
            <button onClick={toggle}>The toggle is {on ? "on" : "off"}</button>
          );
        }}
      />
      <footer>footer</footer>
    </div>
  );
}

export default MyComponent;
```

When we did the re-usable toggle state as an HoC, there were props given to our entire `MyComponent`, but chances are we just needed the values of those props in the JSX. So instead let's use a Render Prop pattern as shown above. `Toggle` is now a component unto itself which internally has all the state and functionality for managing a toggle value. It might look a little strange at first, but we're actually passing a function into the prop of `render={fn}`. Then we are returning some JSX. Internally, the `Toggle` component calls render like this:

```jsx
class Toggle extends React.Component {
  // ...

  render() {
    return this.props.render(this.state.on, this.state.toggle);
  }
}
```

Notice that `Toggle` doesn't actually have an JSX, instead it uses the return value of `this.props.render`. The pattern allows `Toggle` to be in charge of the state and functionality but we give control of the JSX on the outside in `MyComponent`. You might think at first, "can't we just do this?":

```jsx
<Toggle>
  <button></button>
<Toggle>
```

This is obviously one way to pass `button` as a child to `Toggle`, but in this case when `Toggle` receives it, the button will be `this.props.children` which isn't something we can easily "send stuff to". We could do this though:

```jsx
<Toggle>
  {(on, toggle) => {
    return <button onClick={toggle}>The toggle is {on ? 'on' : 'off'}</button>
  }}
<Toggle>
```

Technically, we could pass a function as the `children`. This might look different than doing the actual prop called `render`, but actually it's the exact same thing. Using `children` instead of `render` is also called Render Props.

### How do Render Props compare to HoC?

Pretty much all those problems we identified with HoC go away when we use Render Props. Prop collisions will not happen because when we pass our props to `MyComponent`:

```jsx
function MyComponent() {
  // ... code that has render props
}

export default MyComponent;
```

Those props will not be mixed in with the props of the abstraction (the render props in this case). We can do `<MyComponent name="brad" />` and that value will be accessible via `this.props.name` or `props.name` for functional components. If our Render Prop also needed to use the variable name `name`, it would look like this:

```jsx
function MyComponent({ name }) {
  console.log(name);
  return (
    <div>
      <SomeRenderPropsThing>
        {({ name: otherName }) => {
          // ...
        }}
      </SomeRenderPropsThing>
    </div>
  );
}

export default MyComponent;
```

Notice we can alias the name - not something we could have done with HoC's

How about using the same Render Prop twice? Easy:

```jsx
function MyComponent({ name }) {
  console.log(name);
  return (
    <div>
      <h1>My Page</h1>
      <Toggle
        render={(on, toggle) => {
          return (
            <button onClick={toggle}>The toggle is {on ? "on" : "off"}</button>
          );
        }}
      />
      <footer>footer</footer>
      <Toggle
        render={(on, toggle) => {
          return (
            <button onClick={toggle}>The toggle is {on ? "on" : "off"}</button>
          );
        }}
      />
    </div>
  );
}

export default MyComponent;
```

And the values provided to us by `Toggle` don't collide because their in two different functions. Also notice that the indirection doesn't exist. We're not getting a big bag of props and wondering where they came from. All of our props in `MyComponent` come from us. Then the variables given to us from Render Props are not props on `MyComponent`, but easily identifiable values from their respective Render Prop abstraction.

How about that "data fetching" abstraction?

> I'm not trying to say you should make this fetching thing as an HoC or a RenderProp, keep in mind I'm just trying to illustrates an example of an abstraction that _needs_ to be given some dynamic data as it's input. Data fetching is just an easy example

Before we needed to take a prop like `uid` and and give it to the code that does the abstraction:

```jsx
<UserProfile uid={5} />;

// the UserProfile code:
function UserProfile() {}

export default fetchData("/how/do/I/get/the/prop/5/here??", UserProfile);
```

Now with Render Props, it's easy:

```jsx
<UserProfile uid={5} />;

// the UserProfile code:
function UserProfile({ uid }) {
  return (
    <div>
      <FetchData
        url={`/users/${uid}`}
        render={(results) => {
          return <div>User: results.name</div>;
        }}
      />
    </div>
  );
}

export default UserProfile;
```

Render Props solve all the problems I know about that HoC's introduce. However, they do have some new problems that HoC's never had, although one of the new problems is a little silly perhaps.

1. Render Props look ugly! HoC's are nice looking because we just call a function where we do the export and now we just get these magic props that show up. But Render Props require deeper nesting of our JSX and make it look terrible.
2. The values given to us by the Render Props are scoped to the function we pass into `render` or `children`. This is one of the reasons why Render Props solves problems of HoC's but what if we need those values in the lifecycle methods for any reason? Not easy with Render Props. With HoC's those values provided were props at the top level of our component so that wasn't a problem.

## Enter, Hooks!!

Remember, Hooks are not a third-pattern that simply serves as an alternative to the two we've discussed. Hooks are a whole new way to think about writing React and it just so happens that we don't need the HoC and Render Props patterns as much anymore (if at all) since hooks solves those problems in a much nicer way.

This is not an explanation of how hooks works. I'll assume you know enough about hooks to understand my contrast of them to HoC and Render Props.

The main "problems" around HoC's and Render Props revolved around "how" the values of the abstraction were given to our component. Either they were coming in from outside the component as props and therefore we would get prop collisions and indirection, or we would get those values scoped to a function which means we don't have access to those values everywhere in our component. When we write custom hooks, they look like this:

```jsx
function MyComponent({ uid }) {
  const results = useFetch(`/users/${uid}`);
  const { on: menuOn, toggle: toggleMenuOn } = useToggle();
  const { on: userOn, toggle: toggleUserOn } = useToggle();

  return <div>// ...</div>;
}

export default MyComponent;
```

Problems with HoC solved with Hooks

- No variable collisions
- No indirection
- We can use the same custom hook twice
- Composing happens at runtime so we can take our props and use them in hooks (`uid` in this case)

Problems with Render Props solved with Hooks

- Not ugly, doesn't cause deep nesting
- Values given to us by the custom hooks are scoped to the top level of the component itself and not just a limited place in the JSX

<hr />

I'd prefer questions on Twitter if you have any
@bradwestfall

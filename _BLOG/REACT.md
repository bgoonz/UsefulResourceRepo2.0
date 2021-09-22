# React Tips

## Replace Redux with React Query

As our application gets larger it becomes harder to manage state across our components, we may reach for a state management library like Redux.

If our application relies on data that we get from an API, we often use Redux to fetch that server state and then update our application state.

This can be a challenging process; not only do you have to fetch data, but you also need to handle the different states, depending on whether you have the data or are in a loading or error state.

**Instead of using Redux to manage data you get from a server, use a library like React Query.**

React Query not only gives you greater control over making HTTP requests in your React apps through helpful hooks and the ability to easily refetch data, but it also enables us to seamlessly manage state across our app components, often without having to manually update state ourselves.

Here’s how you set up React Query in your index.js file:

    import { QueryClient, QueryClientProvider } from "react-query";
    import ReactDOM from "react-dom";

    import App from "./App";

    const queryClient = new QueryClient();

    const rootElement = document.getElementById("root");
    ReactDOM.render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
      rootElement
    );

Here we are setting up a query client which will setup a cache for us to effortlessly manage any requests that we have made in the past, plus a query client provider component to pass it down the entire component tree.

How do you start making requests with React Query?

You can do so with the useQuery hook, which takes an identifier for our query (in this case, since we are fetching user data, we will call it ‘user’), plus a function that is used to fetch that data.

    import { useQuery } from "react-query";

    export default function App() {
     const { isLoading, isError, data } = useQuery("user", () =>
     fetch("https://randomuser.me/api").then((res) => res.json())
     );

    if (isLoading) return "Loading...";
     if (isError) return "Error!";

    const user = data.results\[0\];
     return user.email;
    }

As you can see, React Query takes care of managing these various states that can take place when we fetch our data. We no longer need to manage these states ourselves, we can just destructure them from what is returned from `useQuery`.

Where does the state management part of useQuery come into play?

Now that we have fetched the user data and have it stored in our internal cache, all we need to do to be able to use it across any other component is to call `useQuery()` with the ‘user’ key that we associated with it:

import { useQuery } from “react-query”;

export default function OtherComponent() {  
const { data } = useQuery(‘user’);

      console.log(data);

}

## Make React Context Easier with a Custom Hook

React Context is a great way to pass data across our component tree. It allows us to pass data into whatever component we like without having to use props.

To consume context in a React function component, we use the `useContext` hook.

However, there is a slight downside to doing so. In every component that we want to consume data that has been passed down on context, we have to import both the created context object and import React to grab the useContext hook.

Instead of having to write multiple import statements every time we want to read from context, we can simply create a custom React hook.

    import React from "react";

    const UserContext = React.createContext();

    function UserProvider({ children }) {
      const user = { name: "Reed" };
      return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
    }

    function useUser() {
      const context = React.useContext(UserContext);
      if (context === undefined) {
        throw new Error("useUser in not within UserProvider");
      }
      return context;
    }

    export default function App() {
      return (
        <UserProvider>
          <Main />
        </UserProvider>
      );
    }

    function Main() {
      const user = useUser();

      return <h1>{user.name}</h1>; // displays "Reed"
    }

In this example, we are passing down user data on our custom UserProvider component, which takes a user object and is wrapped around the Main component.

We have a `useUser` hook to more easily consume that context. We only need to import that hook itself to consume our User Context in any component we like, such as our Main component.

## Manage Context Providers in a Custom Component

In almost any React application that you create, you will need a number of Context providers.

We not only need Context providers not only for React Context that we are creating, but also from third party libraries that rely upon it (like React Query) in order to pass their tools down to our to the components that need them.

Once you’ve started working on your React project for a while, here’s what it tends to look like:

    ReactDOM.render(
      <Provider3>
        <Provider2>
          <Provider1>
            <App />
          </Provider1>
        </Provider2>
      </Provider3>,
      rootElement
    );

What can we do about this clutter?

Instead of putting all of our context providers within our App.js file or index.js file, we can create a component called ContextProviders.

This allows us to use the children prop, then all we have to do is put all these providers into this one component:

    src / context / ContextProviders.js;

    export default function ContextProviders({ children }) {
      return (
        <Provider3>
          <Provider2>
            <Provider1>{children}</Provider1>
          </Provider2>
        </Provider3>
      );
    }

Then, wrap the ContextProviders component around App:

src/index.js

    import ReactDOM from "react-dom";
    import ContextProviders from "./context/ContextProviders";
    import App from "./App";

    const rootElement = document.getElementById("root");
    ReactDOM.render(
      <ContextProviders>
        <App />
      </ContextProviders>,
      rootElement
    );

## Pass props easier using the object spread operator

When it comes to working with components, we normally pass down data with the help of props. We create a prop name and setting it equal to its appropriate value.

However, if we have a lot of props that we need to pass down to a component, do we need to list them all individually?

No, we don’t.

A very easy way to be able to pass down all the props that we like without having to write all of the prop names and their corresponding values is to use the `{...props}` pattern.

This involves putting all of our prop data in an object and spreading all of those props individually to the component we want to pass it to:

    export default function App() {
      const data = {
        title: "My awesome app",
        greeting: "Hi!",
        showButton: true,
      };

      return <Header {...data} />;
    }

    function Header(props) {
      return (
        <nav>
          <h1>{props.title}</h1>
          <h2>{props.greeting}</h2>
          {props.showButton && <button>Logout</button>}
        </nav>
      );
    }

## Map over fragments with React fragment

The `.map()` function in React allows us to take an array and iterate over it, then display each elements data within some JSX.

However, in some cases, we want to iterate over that data but we do not want to return it within a closing JSX element. Maybe using an enclosing JSX element would modify our applied or we simply don’t want to add another element to the DOM.

A little known tip to be able to iterate over a set of data, not have the parent element as an HTML element is to use `React.Fragment`.

To use the longhand form of React fragments allows us can provide it the `key` prop which is required for any element over which we are iterating.

    import React from 'react'

    export default function App() {
     const users = \[
     {
     id: 1,
     name: "Reed"
     },
     {
     id: 2,
     name: "John"
     },
     {
     id: 3,
     name: "Jane"
     }
     \];

    return users.map((user) => (
     <React.Fragment key={user.id}>{user.name}</React.Fragment>
     ));
    }

Note that we cannot use the required `key` prop for the shorthand fragments alternative: `<></>`.

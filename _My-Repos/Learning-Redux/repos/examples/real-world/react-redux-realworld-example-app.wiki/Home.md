Huge thanks to [**@thejmazz**](https://github.com/thejmazz) for taking the time to write these notes about how the codebase works! 🍻

# React-Redux App Architecture

## Entrypoint

File: `index.js`

Imports: `agent.js`, `store.js`, `./components/*`

Renders routes pointing to their associated components:

```html
<Provider store="{store}">
  <Router history="{hashHistory}">
    <Route path="/" component="{App}">
      <IndexRoute component="{Home}" />
      <Route path="login" component="{Login}" />
      <Route path="register" component="{Register}" />
      <Route path="editor" component="{Editor}" />
      <Route path="editor/:slug" component="{Editor}" />
      <Route path="article/:id" component="{Article}" />
      <Route path="settings" component="{Settings}" />
      <Route path="@:username" component="{Profile}" />
      <Route path="@:username/favorites" component="{ProfileFavorites}" />
    </Route>
  </Router>
</Provider>
```

## Agent

File: `agent.js`

Exports an object where each key is a "service" and a service has
methods that internally run a request:

- `get`
- `put`
- `post`
- `delete`

For example, `Auth`:

```javascript
const Auth = {
  current: () => requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: (user) => requests.put('/user', { user }),
}
```

Thus, these services essentially take some options, map to a request, and
return the promise of that request. The general type could be:

```javascript
type Service = {
  [key: string]: (opts: any) => Promise<T>,
}
```

As well, `agent.js` locally stores a token which can be set via the exported
`setToken`. As some config there is `API_ROOT`.

## Redux

### Store

File: `store.js`

Imports: `reducer.js`, `middleware.js`

Fairly simple store setup, applies `promiseMiddleware` before
`localStorageMiddleware`, logger only on development.

### Middleware

File: `middleware.js`

Imports: `agent.js`

#### promiseMiddleware

Intercepts all actions where `action.payload` is a Promise. In which case it:

1. `store.dispatch({ type: 'ASYNC_START', subtype: action.type })`
2. `action.payload.then`
   - success: `store.dispatch({ type: 'ASYNC_END', promise: res })`
   - error: sets `action.error = true`, `store.dispatch({ type: 'ASYNC_END', promise: action.payload })`
3. Then, for success and error, using the modified `action` object: `store.dispatch(action)`

#### localStorageMiddleware

Runs after `promiseMiddleware`. Intercepts `REGISTER | LOGIN` and either

- a. sets token into localstorage and `agent.setToken(token)`
- b. sets token in localstorage to `''` and does `agent.setToken(null)`

### Reducers

File: `reducer.js`

Imports: `./reducers/*.js`

Uses `combineReducers` to export a reducer where each key is the reducer
of the file with the same key.

#### General Reducer Patterns

- map payload into piece of state
- toggle loading states by casing on `ASYNC_START` and `action.subtype`

```javascript
case 'ASYNC_START':
  if (action.subtype === 'LOGIN' || action.subtype === 'REGISTER') {
    return { ...state, inProgress: true };
  }
```

- toggle errors by taking `action.errors` if it is there (see middleware)

```javascript
case 'REGISTER':
  return {
    ...state,
    inProgress: false,
    errors: action.error ? action.payload.errors : null
  };
```

- set state keys to null if they did not come in payload (Flow type issues?)

```javascript
case 'REGISTER':
  return {
    ...state,
    inProgress: false,
    errors: action.error ? action.payload.errors : null
  };
```

- handle redirections (will be triggered by `componentWillReceiveProps` somewhere)

```javascript
case 'REDIRECT':
  return { ...state, redirectTo: null };
case 'LOGOUT':
  return { ...state, redirectTo: '/', token: null, currentUser: null };
case 'ARTICLE_SUBMITTED':
  const redirectUrl = `article/${action.payload.article.slug}`;
  return { ...state, redirectTo: redirectUrl };
```

## Components

Most `mapStateToProps` won't be mentionned, as there are fairly simple. Take
some objects, use them in render.

`mapDispatchToProps` will be referred to as "handlers". Some will emerge as
common ones. Dispatching some specific handlers on some specific lifecylce
methods will also emerge as a pattern.

Handlers:

- `onLoad`
- `onUnload`
- `onSubmit`
- `onClick`
- `onX`

`onLoad` seems to be the most common one, used for any components that need ajax in
data into store into props into their render method (which is basically everything on
an SPA lol).

Patterns

- `onLoad` handlers pass a Promise or multiple promises via `Promise.all`
- sending multiple leads to magic `payload[0]` and `payload[1]` in reducer (see `reducers/article.js`)

- pass a handler, e.g. `onClickTag` as a prop to a child component. child
  component then calls it with agent: `props.onClickTag(tag, agent.Articles.byTag(tag))`. (does this only ever happen with a connected `index.jsx` inside a folder?)

- to render or not to render:

```javascript
if (!this.props.data) {
  component = <Loading /> // or perhaps null like in Header.js, ListErrors, EditProfileSettings in Profile
} else {
  component = <Thing data={this.props.data} />
}
```

- similary, if you cannot call handlers yet since props are not ready:

```javascript
componentWillMount() {
  if (this.props.params.slug) {
    return this.props.onLoad(agent.Articles.get(this.props.params.slug));
  }
  this.props.onLoad(null);
}
```

- use `componentWillReceiveProps` to call handlers if necessary, e.g. in `Editor.js`:

```javascript
componentWillReceiveProps(nextProps) {
  if (this.props.params.slug !== nextProps.params.slug) {
    if (nextProps.params.slug) {
      this.props.onUnload();
      return this.props.onLoad(agent.Articles.get(this.props.params.slug));
    }
    this.props.onLoad(null);
  }
}
```

### Root Component - "/"

Imported components: `Header`

Handlers

- `onLoad: (payload, token) => dispatch({ type: 'APP_LOAD', payload, token, skipTracking: true })`
- `onRedirect: () => dispatch({ type: 'REDIRECT' })`

Lifecycle

```javascript
componentWillMount() {
  const token = window.localStorage.getItem('jwt');
  if (token) {
    agent.setToken(token);
  }

  this.props.onLoad(token ? agent.Auth.current() : null, token);
}

componentWillReceiveProps(nextProps) {
  if (nextProps.redirectTo) {
    this.context.router.replace(nextProps.redirectTo);
    this.props.onRedirect();
  }
}
```

### Home Component - "/"

(`<IndexRoute>` on "/")

Handlers

```javascript
onClickTag: (tag, payload) => dispatch({ type: 'APPLY_TAG_FILTER', tag, payload }),
onLoad: (tab, payload) => dispatch({ type: 'HOME_PAGE_LOADED', tab, payload }),
onUnload: () => dispatch({  type: 'HOME_PAGE_UNLOADED' })
```

Lifecycle

```javascript
componentWillMount() {
  const tab = this.props.token ? 'feed' : 'all';
  const articlesPromise = this.props.token ?
    agent.Articles.feed() :
    agent.Articles.all();

  this.props.onLoad(tab, Promise.all([agent.Tags.getAll(), articlesPromise]));
}

componentWillUnmount() {
  this.props.onUnload();
}
```

### Other Components

Should be self explanatory, follow patterns described above, it was just the home
and index components are somewhat unique due to handling of routing.

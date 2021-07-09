<a href="../introduction/getting-started.html" class="navbar__item navbar__link">Getting Started</a><a href="../tutorials/essentials/part-1-overview-concepts.html" class="navbar__item navbar__link">Tutorial</a><a href="../api/api-reference.html" class="navbar__item navbar__link">API</a><a href="../faq.html" class="navbar__item navbar__link navbar__link--active">FAQ</a><a href="../style-guide/style-guide.html" class="navbar__item navbar__link">Best Practices</a><a href="../official/github.com/reduxjs/redux.html" class="navbar__item navbar__link">GitHub</a><a href="../introduction/getting-started.html#help-and-discussion" class="navbar__item navbar__link">Need help?</a>

<span class="toggle_71bT">🌜</span>

<span class="toggle_71bT">🌞</span>

<span class="DocSearch-Button-Placeholder">Search</span>

<a href="../index.html" class="navbar__brand"><strong>Redux</strong></a>

# <span id="redux-faq-code-structure" class="anchor enhancedAnchor_2LWZ"></span>Redux FAQ: Code Structure<a href="#redux-faq-code-structure" class="hash-link" title="Direct link to heading">#</a>

## <span id="table-of-contents" class="anchor enhancedAnchor_2LWZ"></span>Table of Contents<a href="#table-of-contents" class="hash-link" title="Direct link to heading">#</a>

- [What should my file structure look like? How should I group my action creators and reducers in my project? Where should my selectors go?](#what-should-my-file-structure-look-like-how-should-i-group-my-action-creators-and-reducers-in-my-project-where-should-my-selectors-go)
- [How should I split my logic between reducers and action creators? Where should my “business logic” go?](#how-should-i-split-my-logic-between-reducers-and-action-creators-where-should-my-business-logic-go)
- [Why should I use action creators?](#why-should-i-use-action-creators)
- [Where should websockets and other persistent connections live?](#where-should-websockets-and-other-persistent-connections-live)
- [How can I use the Redux store in non-component files?](#how-can-i-use-the-redux-store-in-non-component-files)

## <span id="what-should-my-file-structure-look-like-how-should-i-group-my-action-creators-and-reducers-in-my-project-where-should-my-selectors-go" class="anchor enhancedAnchor_2LWZ"></span>What should my file structure look like? How should I group my action creators and reducers in my project? Where should my selectors go?<a href="#what-should-my-file-structure-look-like-how-should-i-group-my-action-creators-and-reducers-in-my-project-where-should-my-selectors-go" class="hash-link" title="Direct link to heading">#</a>

Since Redux is just a data store library, it has no direct opinion on how your project should be structured. However, there are a few common patterns that most Redux developers tend to use:

- Rails-style: separate folders for “actions”, “constants”, “reducers”, “containers”, and “components”
- "Feature folders" / "Domain"-style : separate folders per feature or domain, possibly with sub-folders per file type
- “Ducks/Slices”: similar to domain style, but explicitly tying together actions and reducers, often by defining them in the same file

It's generally suggested that selectors are defined alongside reducers and exported, and then reused elsewhere (such as in `mapStateToProps` functions, in async action creators, or sagas) to colocate all the code that knows about the actual shape of the state tree in the reducer files.

##### <span class="admonition-icon"> </span>tip

**We specifically recommend organizing your logic into "feature folders", with all the Redux logic for a given feature in a single "slice/ducks" file"**.

See this section for an example:

#### Detailed Explanation: Example Folder Structure

An example folder structure might look something like:

- `/src`
  - `index.tsx`: Entry point file that renders the React component tree
  - `/app`
    - `store.ts`: store setup
    - `rootReducer.ts`: root reducer (optional)
    - `App.tsx`: root React component
  - `/common`: hooks, generic components, utils, etc
  - `/features`: contains all "feature folders"
    - `/todos`: a single feature folder
      - `todosSlice.ts`: Redux reducer logic and associated actions
      - `Todos.tsx`: a React component

`/app` contains app-wide setup and layout that depends on all the other folders.

`/common` contains truly generic and reusable utilities and components.

`/features` has folders that contain all functionality related to a specific feature. In this example, `todosSlice.ts` is a "duck"-style file that contains a call to RTK's `createSlice()` function, and exports the slice reducer and action creators.

While it ultimately doesn't matter how you lay out your code on disk, it's important to remember that actions and reducers should not be considered in isolation. It's entirely possible (and encouraged) for a reducer defined in one folder to respond to an action defined in another folder.

#### <span id="further-information" class="anchor enhancedAnchor_2LWZ"></span>Further information<a href="#further-information" class="hash-link" title="Direct link to heading">#</a>

**Documentation**

- [Style Guide: Structure Files as Feature Folders with Single-File Logic](../style-guide/style-guide.html##structure-files-as-feature-folders-with-single-file-logic)
- [Redux Essentials tutorial: App Structure](../tutorials/essentials/part-2-app-structure.html)
- [FAQ: Actions - "1:1 mapping between reducers and actions?"](actions.html#actions-reducer-mappings)

**Articles**

- [How to Scale React Applications](../../www.smashingmagazine.com/2016/09/how-to-scale-react-applications/index.html) (accompanying talk: [Scaling React Applications](../../vimeo.com/168648012.html))
- [Redux Best Practices](../../medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e.html)
- [Rules For Structuring (Redux) Applications](../../jaysoo.ca/2016/02/28/organizing-redux-application/index.html)
- [A Better File Structure for React/Redux Applications](../../marmelab.com/blog/2015/12/17/react-directory-structure.html)
- [Organizing Large React Applications](../../engineering.kapost.com/2016/01/organizing-large-react-applications/index.html)
- [Four Strategies for Organizing Code](../../medium.com/%40msandin/strategies-for-organizing-code-2c9d690b6f33.html)
- [Encapsulating the Redux State Tree](../../randycoulman.com/blog/2016/09/13/encapsulating-the-redux-state-tree/index.html)
- [Redux Reducer/Selector Asymmetry](../../randycoulman.com/blog/2016/09/20/redux-reducer-selector-asymmetry/index.html)
- [Modular Reducers and Selectors](../../randycoulman.com/blog/2016/09/27/modular-reducers-and-selectors/index.html)
- [My journey towards a maintainable project structure for React/Redux](../../medium.com/hackernoon/my-journey-toward-a-maintainable-project-structure-for-react-redux-b05dfd999b5.html)
- [React/Redux Links: Architecture - Project File Structure](../../github.com/markerikson/react-redux-links/blob/master/react-redux-architecture.html#project-file-structure)

**Discussions**

- [\#839: Emphasize defining selectors alongside reducers](../../github.com/reduxjs/redux/issues/839.html)
- [\#943: Reducer querying](../../github.com/reduxjs/redux/issues/943.html)
- [React Boilerplate \#27: Application Structure](../../github.com/react-boilerplate/react-boilerplate/issues/27.html)
- [Stack Overflow: How to structure Redux components/containers](../../stackoverflow.com/questions/32634320/how-to-structure-redux-components-containers/32921576.html)
- [Twitter: There is no ultimate file structure for Redux](../../twitter.com/dan_abramov/status/783428282666614784.html)

## <span id="how-should-i-split-my-logic-between-reducers-and-action-creators-where-should-my-business-logic-go" class="anchor enhancedAnchor_2LWZ"></span>How should I split my logic between reducers and action creators? Where should my “business logic” go?<a href="#how-should-i-split-my-logic-between-reducers-and-action-creators-where-should-my-business-logic-go" class="hash-link" title="Direct link to heading">#</a>

There's no single clear answer to exactly what pieces of logic should go in a reducer or an action creator. Some developers prefer to have “fat” action creators, with “thin” reducers that simply take the data in an action and blindly merge it into the corresponding state. Others try to emphasize keeping actions as small as possible, and minimize the usage of `getState()` in an action creator. (For purposes of this question, other async approaches such as sagas and observables fall in the "action creator" category.)

There are several potential benefits from putting more logic into your reducers. It's likely that the action types would be more semantic and more meaningful (such as `"USER_UPDATED"` instead of `"SET_STATE"`). In addition, having more logic in reducers means that more functionality will be affected by time travel debugging.

This comment sums up the dichotomy nicely:

> Now, the problem is what to put in the action creator and what in the reducer, the choice between fat and thin action objects. If you put all the logic in the action creator, you end up with fat action objects that basically declare the updates to the state. Reducers become pure, dumb, add-this, remove that, update these functions. They will be easy to compose. But not much of your business logic will be there. If you put more logic in the reducer, you end up with nice, thin action objects, most of your data logic in one place, but your reducers are harder to compose since you might need info from other branches. You end up with large reducers or reducers that take additional arguments from higher up in the state.

##### <span class="admonition-icon"> </span>tip

**We recommend putting as much logic as possible into reducers**. There are times when you may need some logic to help prepare what goes into the action, but reducers should do most of the work.

#### <span id="further-information-1" class="anchor enhancedAnchor_2LWZ"></span>Further information<a href="#further-information-1" class="hash-link" title="Direct link to heading">#</a>

**Documentation**

- [Style Guide: Put as Much Logic as Possible in Reducers](../style-guide/style-guide.html#put-as-much-logic-as-possible-in-reducers)
- [Style Guide: Model Actions as "Events", not "Setters"](../style-guide/style-guide.html#model-actions-as-events-not-setters)

**Articles**

- [Where do I put my business logic in a React/Redux application?](../../medium.com/%40jeffbski/where-do-i-put-my-business-logic-in-a-react-redux-application-9253ef91ce1.html)
- [How to Scale React Applications](../../www.smashingmagazine.com/2016/09/how-to-scale-react-applications/index.html)
- [The Tao of Redux, Part 2 - Practice and Philosophy. Thick and thin reducers.](../../blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-2/index.html#thick-and-thin-reducers)

**Discussions**

- [How putting too much logic in action creators could affect debugging](../../github.com/reduxjs/redux/issues/384.html#issuecomment-127393209)
- [\#384: The more that's in a reducer, the more you can replay via time travel](../../github.com/reduxjs/redux/issues/384.html#issuecomment-127393209)
- [\#1165: Where to put business logic / validation?](../../github.com/reduxjs/redux/issues/1165.html)
- [\#1171: Recommendations for best practices regarding action-creators, reducers, and selectors](../../github.com/reduxjs/redux/issues/1171.html)
- [Stack Overflow: Accessing Redux state in an action creator?](../../stackoverflow.com/questions/35667249/accessing-redux-state-in-an-action-creator/35674575.html)
- [\#2796: Gaining clarity on "business logic"](../../github.com/reduxjs/redux/issues/2796.html#issue-289298280)
- [Twitter: Moving away from unclear terminology...](../../twitter.com/FwardPhoenix/status/952971237004926977.html)

## <span id="why-should-i-use-action-creators" class="anchor enhancedAnchor_2LWZ"></span>Why should I use action creators?<a href="#why-should-i-use-action-creators" class="hash-link" title="Direct link to heading">#</a>

Redux does not require action creators. You are free to create actions in any way that is best for you, including simply passing an object literal to `dispatch`. Action creators emerged from the [Flux architecture](../../reactjs.org/blog/2014/07/30/flux-actions-and-the-dispatcher.html#actions-and-actioncreators) and have been adopted by the Redux community because they offer several benefits.

Action creators are more maintainable. Updates to an action can be made in one place and applied everywhere. All instances of an action are guaranteed to have the same shape and the same default values.

Action creators are testable. The correctness of an inline action must be verified manually. Like any function, tests for an action creator can be written once and run automatically.

Action creators are easier to document. The action creator's parameters enumerate the action's dependencies. And centralization of the action definition provides a convenient place for documentation comments. When actions are written inline, this information is harder to capture and communicate.

Action creators are a more powerful abstraction. Creating an action often involves transforming data or making AJAX requests. Action creators provide a uniform interface to this varied logic. This abstraction frees a component to dispatch an action without being complicated by the details of that action's creation.

#### <span id="further-information-2" class="anchor enhancedAnchor_2LWZ"></span>Further information<a href="#further-information-2" class="hash-link" title="Direct link to heading">#</a>

**Articles**

- [Idiomatic Redux: Why use action creators?](../../blog.isquaredsoftware.com/2016/10/idiomatic-redux-why-use-action-creators/index.html)

**Discussions**

- [Reddit: Redbox - Redux action creation made simple](../../www.reddit.com/r/reactjs/comments/54k8js/redbox_redux_action_creation_made_simple/d8493z1/indexa00a.html?context=4)

## <span id="where-should-websockets-and-other-persistent-connections-live" class="anchor enhancedAnchor_2LWZ"></span>Where should websockets and other persistent connections live?<a href="#where-should-websockets-and-other-persistent-connections-live" class="hash-link" title="Direct link to heading">#</a>

Middleware are the right place for persistent connections like websockets in a Redux app, for several reasons:

- Middleware exist for the lifetime of the application
- Like with the store itself, you probably only need a single instance of a given connection that the whole app can use
- Middleware can see all dispatched actions and dispatch actions themselves. This means a middleware can take dispatched actions and turn those into messages sent over the websocket, and dispatch new actions when a message is received over the websocket.
- A websocket connection instance isn't serializable, so [it doesn't belong in the store state itself](organizing-state.html#organizing-state-non-serializable)

See [this example that shows how a socket middleware might dispatch and respond to Redux actions](../../gist.github.com/markerikson/3df1cf5abbac57820a20059287b4be58.html).

There's many existing middleware for websockets and other similar connections - see the link below.

**Libraries**

- [Middleware: Socket and Adapters](../../github.com/markerikson/redux-ecosystem-links/blob/master/middleware-sockets-adapters.html)

## <span id="how-can-i-use-the-redux-store-in-non-component-files" class="anchor enhancedAnchor_2LWZ"></span>How can I use the Redux store in non-component files?<a href="#how-can-i-use-the-redux-store-in-non-component-files" class="hash-link" title="Direct link to heading">#</a>

There should only be a single Redux store per application. This makes it effectively a singleton in terms of the app architecture. When used with React, the store is injected into the components at runtime by rendering a `<Provider store={store}>` around the root `<App>` component, so only the application setup logic needs to import the store directly.

However, there may be times when other parts of the codebase need to interact with the store as well.

**You should avoid importing the store directly into other codebase files**. While it may work in some cases, that often ends up causing circular import dependency errors.

Some possible solutions are:

- Write your store-dependent logic as a thunk, and then dispatch that thunk from a component
- Pass along references to `dispatch` from components as arguments the relevant functions
- Write the logic as middleware and add them to the store at setup time
- Inject the store instance into the relevant files as the app is being created.

One common use case is reading API authorization information such as a token from the Redux state, inside of an Axios interceptor. The interceptor file needs to reference `store.getState()`, but also needs to be imported into API layer files, and this leads to circular imports.

You can expose an `injectStore` function from the interceptor file instead:

common/api.js

<span class="token keyword" style="color: #f92672">let</span><span class="token plain"> store</span>

<span class="token plain" style="display: inline-block"> </span>

<span class="token plain"></span><span class="token keyword module" style="color: #f92672">export</span><span class="token plain"> </span><span class="token keyword" style="color: #f92672">const</span><span class="token plain"> </span><span class="token function" style="color: #e6d874">injectStore</span><span class="token punctuation" style="color: #f8f8f2">(</span><span class="token parameter">\_store</span><span class="token punctuation" style="color: #f8f8f2">)</span><span class="token plain"> </span><span class="token punctuation" style="color: #f8f8f2">{</span><span class="token plain"></span>

<span class="token plain"> store </span><span class="token operator" style="color: #f8f8f2">=</span><span class="token plain"> \_store</span>

<span class="token plain"></span><span class="token punctuation" style="color: #f8f8f2">}</span><span class="token plain"></span>

<span class="token plain" style="display: inline-block"> </span>

<span class="token plain">axiosInstance</span><span class="token punctuation" style="color: #f8f8f2">.</span><span class="token property-access">interceptors</span><span class="token punctuation" style="color: #f8f8f2">.</span><span class="token property-access">request</span><span class="token punctuation" style="color: #f8f8f2">.</span><span class="token method function property-access" style="color: #e6d874">use</span><span class="token punctuation" style="color: #f8f8f2">(</span><span class="token plain"></span>

<span class="token plain"> </span><span class="token parameter">config</span><span class="token plain"> </span><span class="token arrow operator" style="color: #f8f8f2">=&gt;</span><span class="token plain"> </span><span class="token punctuation" style="color: #f8f8f2">{</span><span class="token plain"></span>

<span class="token plain"> config</span><span class="token punctuation" style="color: #f8f8f2">.</span><span class="token property-access">headers</span><span class="token punctuation" style="color: #f8f8f2">.</span><span class="token property-access">authorization</span><span class="token plain"> </span><span class="token operator" style="color: #f8f8f2">=</span><span class="token plain"> store</span><span class="token punctuation" style="color: #f8f8f2">.</span><span class="token method function property-access" style="color: #e6d874">getState</span><span class="token punctuation" style="color: #f8f8f2">(</span><span class="token punctuation" style="color: #f8f8f2">)</span><span class="token punctuation" style="color: #f8f8f2">.</span><span class="token property-access">auth</span><span class="token punctuation" style="color: #f8f8f2">.</span><span class="token property-access">token</span><span class="token plain"></span>

<span class="token plain"> </span><span class="token keyword control-flow" style="color: #f92672">return</span><span class="token plain"> config</span><span class="token punctuation" style="color: #f8f8f2">;</span><span class="token plain"></span>

<span class="token plain"> </span><span class="token punctuation" style="color: #f8f8f2">}</span><span class="token plain"></span>

<span class="token plain"></span><span class="token punctuation" style="color: #f8f8f2">)</span>

Copy

Then, in your entry point file, inject the store into the API setup file:

index.js

<span class="token keyword module" style="color: #f92672">import</span><span class="token plain"> </span><span class="token imports">store</span><span class="token plain"> </span><span class="token keyword module" style="color: #f92672">from</span><span class="token plain"> </span><span class="token string" style="color: #a6e22e">"./app/store"</span><span class="token punctuation" style="color: #f8f8f2">.</span><span class="token plain"></span>

<span class="token plain"></span><span class="token keyword module" style="color: #f92672">import</span><span class="token plain"> </span><span class="token imports punctuation" style="color: #f8f8f2">{</span><span class="token imports">injectStore</span><span class="token imports punctuation" style="color: #f8f8f2">}</span><span class="token plain"> </span><span class="token keyword module" style="color: #f92672">from</span><span class="token plain"> </span><span class="token string" style="color: #a6e22e">"./common/api"</span><span class="token punctuation" style="color: #f8f8f2">;</span><span class="token plain"></span>

<span class="token plain"></span><span class="token function" style="color: #e6d874">injectStore</span><span class="token punctuation" style="color: #f8f8f2">(</span><span class="token plain">store</span><span class="token punctuation" style="color: #f8f8f2">)</span><span class="token punctuation" style="color: #f8f8f2">;</span>

Copy

This way, the application setup is the only code that has to import the store, and the file dependency graph avoids circular dependencies.

<a href="immutable-data.html" class="pagination-nav__link"></a>

Previous

« Immutable Data

<a href="performance.html" class="pagination-nav__link"></a>

Next

Performance »

- <a href="#table-of-contents" class="table-of-contents__link">Table of Contents</a>
- <a href="#what-should-my-file-structure-look-like-how-should-i-group-my-action-creators-and-reducers-in-my-project-where-should-my-selectors-go" class="table-of-contents__link">What should my file structure look like? How should I group my action creators and reducers in my project? Where should my selectors go?</a>
- <a href="#how-should-i-split-my-logic-between-reducers-and-action-creators-where-should-my-business-logic-go" class="table-of-contents__link">How should I split my logic between reducers and action creators? Where should my “business logic” go?</a>
- <a href="#why-should-i-use-action-creators" class="table-of-contents__link">Why should I use action creators?</a>
- <a href="#where-should-websockets-and-other-persistent-connections-live" class="table-of-contents__link">Where should websockets and other persistent connections live?</a>
- <a href="#how-can-i-use-the-redux-store-in-non-component-files" class="table-of-contents__link">How can I use the Redux store in non-component files?</a>

#### Docs

- <a href="../introduction/getting-started.html" class="footer__link-item">Getting Started</a>
- <a href="../tutorials/essentials/part-1-overview-concepts.html" class="footer__link-item">Tutorial</a>
- <a href="../faq.html" class="footer__link-item">FAQ</a>
- <a href="../api/api-reference.html" class="footer__link-item">API Reference</a>

#### Community

- <a href="../official/discord.com/invite/0ZcbPKXt5bZ6au5t.html" class="footer__link-item">Reactiflux Discord</a>
- <a href="../official/stackoverflow.com/questions/tagged/redux.html" class="footer__link-item">Stack Overflow</a>
- <a href="../introduction/getting-started.html#help-and-discussion" class="footer__link-item">Feedback</a>

#### More

- <a href="../official/github.com/reduxjs/redux.html" class="footer__link-item">GitHub</a>
- [![Deploys by Netlify](../../www.netlify.com/img/global/badges/netlify-color-accent.svg)](../../www.netlify.com/index.html)

<a href="../index.html" class="footerLogoLink_MyFc"><img src="../official/d33wubrfki0l68.cloudfront.net/0834d0215db51e91525a25acf97433051f280f2f/c30f5/img/redux.svg" alt="Redux Logo" class="themedImage_1VuW themedImage--light_3UqQ footer__logo" /><img src="../official/d33wubrfki0l68.cloudfront.net/0834d0215db51e91525a25acf97433051f280f2f/c30f5/img/redux.svg" alt="Redux Logo" class="themedImage_1VuW themedImage--dark_hz6m footer__logo" /></a>

Copyright © 2015–2021 Dan Abramov and the Redux documentation authors.

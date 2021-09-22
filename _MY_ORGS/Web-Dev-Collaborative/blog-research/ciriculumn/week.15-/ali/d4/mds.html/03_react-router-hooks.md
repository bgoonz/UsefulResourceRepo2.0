# React Router Hooks
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

Now it's time to dig into the specifics of how hooks can simplify **React** code
when working with React Router, specifically `react-router-dom`.

When you complete this lesson, you should be able to use the hooks that are
built into the `react-router-dom` package:

* `useParams` for matching parameters in the current route
* `useHistory` for navigation from code (without `Link` or `NavLink`)
* `useLocation` for tracking url changes
* `useRouteMatch` for checking if the current url matches a path format

## `useParams`

The most common usage of hooks with `react-router-dom` is the case where 
a RESTful path has one or more parameters, such as an `id`.

For example, the `id` in a path like `/user/:id` may be accessed as the 
property of an object returned by `useParams()`.

Option 1
```javascript
const params = useParams();
console.log('User id is', params.id);
```

Option 2 (more common)
```javascript
const { id } = useParams();
console.log('User id is', id);
```

Now, consider this path `/user/:userId/doc/:docId`. It has two parameters, 
`userId` and `docId`; therefore, they would be accessed using
`const { userId, docId } = useParams()`. Notice how the variables in the path
match the properties on the objects returned by `useParams()`.

Here's an expanded example showing a basic function component.

```javascript
// ./src/components/Document.js

import React from 'react';
import { useParams } from 'react-router-dom';

const Document = () => {
    const { userId, docId } = useParams();

    return (
        <>
            <h2>Document {docId}</h2>
            <p>Created by User {userId}</p>
        </>
    );
};

export default Document;
```

As a reminder, you'll need to wrap your components within a `<Router>` in order 
to use the hooks built into the `react-router-dom` package. Perhaps like this...

```javascript
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Document from './components/Document';

// For simplicity, Router and Switch are here instead of the traditional App.js
ReactDOM.render(
    <Router>
        <Switch>
            <Route path='/user/:userId/doc/:docId' component={Document} />
            {/* Other routes also */}
        </Switch>
    </Router>,
  document.getElementById('root')
);
```

## `useHistory`

The `useHistory()` hook gives you access to the **history** object, which is
a record of paths visited on the current browser tab.

While there are a number of possibilities for what you can do with `history`, 
some are more useful than others. Here are the top methods and property.

* `push(path, [state])`
  * Adds a new path to the history and navigates there
  * `state` object is optional
* `replace(path, [state])`
  * Removes the current path from history before adding the new path
  and navigating there
  * `state` object is optional
  * When the user goes back from the next path, they will skip the replaced path 
   (either with the browser's BACK button or the `goBack()` function)
* `goBack()`
  * Returns to the previous path in the history
* `location` - the current location 
  * `pathname` - the path
  * `search` - query params (following a `?` in the url), if any
  * `hash` - value following a `#` in the url, if any
  * `state` - object provided with `push()` or `replace()`

The `state` object is a way for you to pass one or more data values between
routes. The sender creates the object and passes it as the second argument to
`history.push` or `history.replace`; the receiver accesses the object using
`history.location.state`.

For more capabilities, you can read the [documentation on History], if you so 
desire.

Here's an example of a function component using history for custom navigation.

```javascript
// ./src/components/ComingSoon.js

import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const ComingSoon = () => {
    const history = useHistory();

    useEffect(() => {
        const tid = setTimeout(() => {
            history.replace('/');
        }, 2000);
        return () => clearTimeout(tid);
    });

    return (
        <h2>Coming Soon</h2>
    );
};

export default ComingSoon;
```

> ASIDE: This example also makes use of the `useEffect` hook discussed in other
> lessons in order to automatically redirect the user after a timeout period.
> In particular, notice how `return` is used to prevent warnings in React
> if the user chooses to leave the page before the timeout period ends.

## `useLocation`

The preferred approach to accessing the location from within a component is 
through the history object. However, there is a special case where the 
`useLocation` hook is useful - connecting to a service which tracks page loads.

One example is **Google Analytics**.

```javascript
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    useLocation
} from 'react-router-dom';
import ga from 'react-ga';

const TrackingWrapper = ({ children }) => {
    const location = useLocation();
    React.useEffect(() => {
        ga.send(['pageview', location.pathname]);
    }, [location]);
    return children;
}

ReactDOM.render(
    <Router>
        <TrackingWrapper>
            <Switch>
                {/* App and/or Routes, etc. */}
            </Switch>
        </TrackingWrapper>
    </Router>,
  document.getElementById('root')
);

```

The setup and usage of Google Analytics is beyond the scope of this lesson. 
However, if you'd like to learn more you can search online for examples, such as
[Google Analytics with React]. In short, the call to `ga.send()` logs whatever
event you pass it into your GA account. Then you can sign in to GA to view and
analyze the recorded data including days and times when users are most active,
what country your visitors are coming from, and much more.

## `useRouteMatch`

If you'd like to check for a matching path before rendering a route, then
turn to `useRouteMatch`. This hook accepts an argument which is compared to the
current path in the same fashion as `Route` and returns a boolean (`true` or 
`false`).

For example, `useRouteMatch('/report/advanced')` could be
used to show (or hide, when not matching) an advanced user interface for 
modifying a report on the fly.

## Bring it together

Here is an example of a component which lays the framework for a thorough usage
of React Router hooks (except `location` which is better used elsewhere). Use 
your detective skills to figure out as much as you can. A thorough explanation 
is provided in one of the video lessons.

Imagine the following `Report` component is placed in a router with
`<Route path={['/report/:date', '/report']} component={Report}/>`.

> BONUS: In case you didn't know already, a router can use an array to specify
> multiple paths to match with the provided component.

```javascript
// ./src/components/Report.js

import React, {useEffect} from 'react';
import { useRouteMatch, useHistory, useParams } from 'react-router-dom';

const Report = () => {
    const matchUC = useRouteMatch({
        path: '/REPORT*',
        strict: true,
        sensitive: true
    });
    const matchAdvanced = useRouteMatch([
        '/report/advanced',
        '/report/*/advanced'
    ]);
    const matchAll = useRouteMatch('/report/all');
    const { date } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (matchUC)
            history.replace(history.location.pathname.toLowerCase());
    }, [matchUC, history])

    if (matchUC)
        return ""

    if (!date) return (
        <p>Select Report
            <br/><button onClick={() =>
                history.push('/report/last-week')
            }>Last Week</button>
            <br/><button onClick={() =>
                history.push('/report/last-month')
            }>Last Month</button>
            <br/><button onClick={() =>
                history.push('/report/all')
            }>View All</button>
        </p>
    );

    if (date === 'advanced') return (
        <p>Select Report
            <br/><button onClick={() =>
                history.push('/report/last-week/'+date)
            }>Last Week</button>
            <br/><button onClick={() =>
                history.push('/report/last-month/'+date)
            }>Last Month</button>
            <br/><button onClick={() =>
                history.push('/report/all/'+date)
            }>View All</button>
        </p>
    );

    if (matchAll) return (
        <>
            <h2>Complete Report of Everything</h2>
            {matchAdvanced && <p>... Alternate Advanced Controls ...</p>}
        </>
    )

    return (
        <>
            <h2>Report For {date}</h2>
            {matchAdvanced && <p>... Advanced Controls ...</p>}
        </>
    );
};

export default Report;
```

The various routes to explore include

* `/REPORT` or `/REPORT/SOMETHING/ADVANCED` or any other variation starting with
REPORT in all caps will redirect to the same url in lowercase
* `/report` or `/report/advanced` will show a few buttons
* `/report/all` will show a different title than `/report/something-else`
(with or without the next option)
* any url ending in `/advanced` will show "Advanced Controls"

## What you've learned

The `react-router-dom` package comes with hooks you can use to simplify the code 
in your **React** applications. For example, utilizing 
`const { id } = useParams()` within a component displayed in the path 
`/user/:id` give you access to the value that replaces the `:id` parameter. 
Navigating can be accomplished with `const history = useHistory()` followed by 
`history.push('/a/new/path')`, and you can even include a `state` object as 
a second parameter. Additionally, `useLocation` can help you connect to tracking 
services, and `useRouteMatch` might come in handy once in while for pattern 
matching on the path itself. In short, the handling of RESTful paths in React is 
enhanced when you embrace the hooks available in React Router.

For future reference, you may want to bookmark the 
[official documentation on React Router Hooks].


[documentation on History]: https://reactrouter.com/web/api/history
[Google Analytics with React]: https://levelup.gitconnected.com/using-google-analytics-with-react-3d98d709399b
[official documentation on React Router Hooks]: https://reactrouter.com/web/api/Hooks

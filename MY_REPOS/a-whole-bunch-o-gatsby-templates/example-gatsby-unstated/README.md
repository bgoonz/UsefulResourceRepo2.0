# This is an example of usage Unstated state container with GatsbyJS

> [Live Demo](https://greglobinski.github.io/example-gatsby-unstated/)

To use unstated in a Gatsby site you'll need to hook in to two of Gatsby's
extension points.

Once in `replaceRenderer` which runs during Gatsby's server rendering process,
and once in `replaceRouterComponent` which is part of Gatsby's browser APIs.

Check out [`./gatsby-ssr.js`](./gatsby-ssr.js) and
[`./gatsby-browser.js`](./gatsby-browser.js) to see how this is implemented in this example.

### Run on localhost

```
gatsby new example-gatsby-unstated https://github.com/greglobinski/example-gatsby-unstated.git
cd example-gatsby-unstated
gatsby develop
```

### Test

Tests based on `jest` and `react-testing-library`

```
yarn test
```

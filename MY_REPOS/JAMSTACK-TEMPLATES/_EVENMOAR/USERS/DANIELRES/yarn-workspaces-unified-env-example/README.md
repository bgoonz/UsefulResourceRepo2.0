This simple example app demonstrates a number of techniques that I've been researching in order to improve developers experience:

## [Yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) are used to:

1. break down the monorepo into smaller, easy to compose modules
1. simplify build steps and hosting

## In particular, the [env](https://github.com/danielres/yarn-workspaces-unified-env-example/tree/master/env) workspace

1. handles all env vars for both API and UI
1. centralize and greatly simplify env vars management
1. automatically validates all env vars, using the amazing [envalid](https://github.com/af/envalid)

To validate all env vars, for example during prebuild, and ensure the build is cancelled if any is missing:

- `node -r esm env`

## Using the [esm](https://github.com/standard-things/esm) loader

1. Enables ES6 features in node, like `import` statements instead of `requires` \o/ \o/ \o/
1. Provides a more smooth & consistent coding experience
1. Makes it possible to have a unified env vars management, shared seamlessly by both UI and API. \
   For example, these commands allow validate the env vars, then pass them to the scripts:
   - `node -r esm -r env api/server.js`
   - `node -r esm -r env ui/build.js`

## What is this boilerplate good for?

- Projects in early stages
- Company internal tools: intranets, ...
- Basically, small projects where having a more unified frontend + backend served together (on 1 dyno in the Heroku case) is all you need.

## Usage

Runing locally (in development):

`yarn dev` starts both UI and API server in parallel, in dev mode

Hosting on Heroku:

Shoud work out of the box, just normally deploy to Heroku.
After build, the backend will both serve the UI and API (under `/graphql`)

# v8-bears-team-06

[![CircleCI](https://circleci.com/gh/chingu-voyages/v8-bears-team-06.svg?style=svg)](https://circleci.com/gh/chingu-voyages/v8-bears-team-06)
[![codecov](https://codecov.io/gh/chingu-voyages/v8-bears-team-06/branch/develop/graph/badge.svg)](https://codecov.io/gh/chingu-voyages/v8-bears-team-06)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Add-project-description-here | Voyage-8 | https://chingu.io/

## Requirements

- Node (>= 8.x should work)
- npm (6.x should work)

## How to Contribute

First, fork or clone this repository. Then run `npm ci` to install all dependencies.  
To run a development server, run `npm start:dev`.  
When you make a new PR, make sure the following checks pass.

- Test: `npm run test`
- Lint: `npm run lint`
- Format: `npm run format:check`  
  If format check fails, you can run `npm run format` to automatically format all the code.

Optinally you can run `npm run coverage` to measure code coverage.

## Tech Stack

- Frontend
  - Next.js: A React framework
  - Apollo Client: GraphQL client
- Backend
  - Express.js: server side framework
  - Apollo Server: GraphQL server
  - Mongoose: MongoDB client for Node.js

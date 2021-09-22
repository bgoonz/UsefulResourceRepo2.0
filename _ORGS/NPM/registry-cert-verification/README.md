# npm Registry SSL certificate verification

A simple, no-brainer way to be absolutely sure the latest npm Registry cert configuration is ready to go.

## Usage

0. Make a hosts file change such that registry.npmjs.org points at whatever you're testing
1. `npm install`
2. `npm run setup` to download and extract the versions of npm to be tested (only once!)
3. `npm start` to run the tests
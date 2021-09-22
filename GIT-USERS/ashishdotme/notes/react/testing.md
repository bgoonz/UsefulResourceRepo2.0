---
id: testing
title: Testing
---

## Testing with Mocha, Chai, Enjyme and Sinon

### Mocha

Mocha is a javascript test framework which supports asynchronous testing, test coverage
reports and use of any assertion library.

### Chai

Chai is a BDD/TDD assertion library

### Enzyme

Enjyme is a javascript testing utility for React that makes it easier to traverse and
manipulate react component's output

### Sinon

Sinon is used for Spies/Stubs/Mocks. It can also fake ajax calls and timers. So basically
it allows you solve problems which occur due to external dependencies.

1. Spies - offers information about function cals
2. Stubs - Which are like spies but completely replace the functions
3. Mocks - It replaces the whole object by combining spies and stubs

## Adding Mocha, Chai, Enjyme and Sinon to the project

```shell
yarn add --dev chai
yarn add --dev enzyme
yarn add --dev enzyme-adapter-react-16
yarn add --dev mocha
yarn add --dev @types/chai
yarn add --dev @types/enzyme
yarn add --dev @types/enzyme-adapter-react-16
yarn add --dev @types/mocha
yarn add --dev chai enzyme enzyme-adapter-react-16 mocha
yarn add --dev @types/chai @types/enzyme @types/enzyme-adapter-react-16 @types/mocha
```

# Chess Blockchain

## Introduction

**You don't have to understand how blockchain works to complete this challenge. Read on only if you are interested in blockchain. You can also skip to Getting Started.**

You are trying to build a free and public chess game without a centralized server. The problem with not having a centralized server however is that you cannot guarentee that the other player didn't change the history of the moves thus cheating the outcome.

## Intro to Blockchain

The goal of blockchain is a way to decentralize data.  
**Hashing**
hashing simply takes an arbituary set of data and 'converts' it into a string of characters called a hash. This hash is unpredicable from the input data.

**Block**
A block has two main parts: Block Data (that is to be hashed), and Block Hash (hashed from Block Data)

**Validity Requirement**
In order for a block to be "valid", the Blockchain network sets a validity requirement (which can change over time). This requirement, in the case of bitcoin and this chess blockchain, is a certain number of leading zeros of the Block Hash.

**Block Data**
There are three parts to the Block Data, which essentially is what makes a blockchain unique.

- Previous Block Hash: the Block Hash for the previous Block. (Realistically, this should be a pointer pointing to the value of the previous block hash.)
- Data: this is the "meat" of the block. This is where the state and/or transational data lives.
- Nonce: this is the variable part of the Block. Remember that hashing the Block Hash is unpredicatible, but the Block Hash needs a certain number of leading zeros. Nonce is a random string that will make your Block Data hash to a valid Block Hash (thus a valid Block!)

**Mining**
As you can imagine, it might take a while to find a Nonce that produces a valid Block Hash. This requires CPU power as well as time to generate the random Nonces to try. That's why this process it called mining.

**Three checks for a valid blockchain**

1. Each Block Hash should be the next Block's Previous Hash
2. Block Data should hash to the Block Hash
3. Each Block Hash should pass the validity requirement (number of leading zeros)

## Getting Started

1. `npm install`
2. `npm start` <-- this is important because this starts the `webpack` dev server and build process
3. go to [localhost:9000](http://localhost:9000)
4. play with the interface a bit (the two buttons on the left is broken on purpose for the challenge)
5. notice the instruction text below the chessboard [(make a move) => (mine the block) => (make a new block)]
6. Take a look at the source code

### Important Source Code

- `src/index.js` - entry js for the application
- `src/Blockchain/Blockchain.js` - Blockchain constructor function
- `src/Blockchain/Block.js` - Block constructor function (notice the ES6 class syntax)
- `dist/index.html` - markup file

## Regular Challenge

Right now, the blockchain object, as well as all of its blocks, all have the HTML elements referenced inside them.
There is an API out there that verifies your blockchain, but only if you serialize the blockchain to pass over HTTP.

Rule 1: Implement both challenges below in the challenge area close to the bottom of `index.html`
Rule 2: Do not change or utlize the `chain` variable. And Do not change other parts of the app.

### 1. implement a `serialize` method

- Create a `serialize` method on the `Blockchain` constructor function (ie do not touch the `chain` variable)
- The method should return a JSON stringified string of the blockchain.
- When you implemented the code correctly, you should see the textarea under the Serialize Button populate

> Tip: Take a peek in the Blockchain and Block file and see which properties are useful.

> Tip2: Use the dev console to access `chain`

> Tip3: This function can be done in one line with the help of functional programming

### 2. Implement a `verify` method

- There is an online API for you to verify to see if your blockchain is valid.
- It expects a POST to `https://chessblockchain-fa.azurewebsites.net/api/verify` with the serialized data in this json format:

```json
{
  "chain": "[[serializedBlockchainData]]"
}
```

- your verify method should return a promise (like from `fetch` we used yesterday for Kevin's tech challenge)
- The promise should be the JSON object that the API gives back which looks like `{'result': true, 'reason': null}`
  > Tip: you should use the `serialize` method you created to add to your body

> Overall Tip: The two exercise combined shouldn't take more than 20 LOC

## Extra Challenge:

For the extra challenges, you are not restricted in writing your code in the challenge area in `index.html`

### Extra Credit 1: Automate Block Mining

1. When the position changes, automatically mine the block.
2. If the game is not over, automatically create a new block.
   This way, the user just has to keep making moves

### Extra Credit 2: Making Mining Async

Right now, you might have noticed that while the block is mining, everything else is unresponsive.

1. using WebWorker, throw the job of mining into another thread
2. Might need to increase the zeroRequirement to see it work. You can set a higher requirement in the second parameter when initializing the blockchain.

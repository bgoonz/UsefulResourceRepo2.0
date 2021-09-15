/* global fetch  */

import Chess from "chess.js";
import Blockchain from "./Blockchain/Blockchain.js";
import ChessBoardFactory from "./ChessBoardFactory";
import { updateGameStatus } from "./helpers";

const game = new Chess();
const chain = new Blockchain("blockchain");
const board = ChessBoardFactory(game, chain, updateGameStatus);
chain.onChange(() => {
  updateGameStatus(game, chain);
});

document.querySelector("#new-block-button").addEventListener("click", () => {
  chain.addNewBlock();
});

document.querySelector("#serialize-button").addEventListener("click", () => {
  document.querySelector("#serialize-textarea").textContent = chain.serialize();
});

document.querySelector("#verify-button").addEventListener("click", () => {
  chain.verify().then((result) => {
    document.querySelector("#verify-textarea").textContent =
      JSON.stringify(result);
  });
});

/** YOUR CODE STARTS HERE */

// Your code--modify Blockchain

Blockchain.prototype.serialize = function () {
  var formatted = this.chain.map(function (obj) {
    return obj.block;
  });
  return JSON.stringify(formatted);
};
console.log(chain.serialize());

Blockchain.prototype.verify = function () {
  return fetch("https://chessblockchain-fa.azurewebsites.net/api/verify", {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: JSON.stringify({ chain: this.serialize() }),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      console.log(json);
      return json.result;
    });
};

/** YOUR CODE ENDS HERE */

/** for dev only */
window.game = game;
window.chain = chain;
window.board = board;

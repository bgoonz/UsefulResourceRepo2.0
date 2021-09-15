import Block from "./Block";
import uuid from "uuid";
import { strToNode } from "../helpers";
import delegate from "delegate";

function Blockchain(id, requirement = 3) {
  this.el = document.querySelector("#" + id);
  this.delegateMineButton();
  Object.defineProperty(this, "zeroRequirement", {
    enumerable: true,
    configuarable: false,
    writable: false,
    value: requirement,
  });
  this.chainChangeCallbacks = [];
  this.chain = [];
  this.chainIndex = {};

  this.addNewBlock("start");
}

Blockchain.prototype.delegateMineButton = function () {
  delegate(this.el, ".generate-button", "click", (evt) => {
    const blockId = evt.delegateTarget.closest(".block-container").id;
    const block = this.chainIndex[blockId];
    block.generateNonce();
    block.render();
    this.refreshPreviousHashes();
    this.refreshNewBlockButton();
    this.runChainChangeCallbacks();
  });
  delegate(this.el, ".mine-button", "click", (evt) => {
    const blockId = evt.delegateTarget.closest(".block-container").id;
    const block = this.chainIndex[blockId];
    block.mineNonce();
    block.render();
    this.refreshPreviousHashes();
    this.refreshNewBlockButton();
    this.runChainChangeCallbacks();
  });
};

Blockchain.prototype.refreshPreviousHashes = function () {
  this.chain.forEach((block, index, chain) => {
    if (index > 0) {
      block.setPreviousHash(chain[index - 1].block.hash);
      block.render();
    }
  });
};

Blockchain.prototype.refreshNewBlockButton = function () {
  let button = document.querySelector("#new-block-button");
  if (this.chain[this.chain.length - 1].isValid()) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
};

Blockchain.prototype.addNewBlock = function () {
  let previousHash;
  if (this.chain.length === 0) {
    previousHash = "start";
  } else {
    previousHash = this.chain[this.chain.length - 1].block.hash;
  }
  const id = "block-" + uuid();
  this.el.appendChild(
    strToNode(`<div id="${id}" class="block-container"></div>`)
  );
  const block = new Block(previousHash, this.zeroRequirement, id);
  this.chain.push(block);
  this.chainIndex[id] = block;
  this.refreshNewBlockButton();
  this.runChainChangeCallbacks();
};

Blockchain.prototype.updateMostRecentBlock = function (data) {
  const block = this.chain[this.chain.length - 1];
  block.setData(data);
  block.render();
  this.refreshNewBlockButton();
};

Blockchain.prototype.isMostRecentBlockDataEmpty = function () {
  const block = this.chain[this.chain.length - 1];
  return block.isDataEmpty();
};

Blockchain.prototype.isMostRecentBlockValid = function () {
  return this.chain[this.chain.length - 1].isValid();
};

Blockchain.prototype.onChange = function (cb) {
  this.chainChangeCallbacks.push(cb);
};

Blockchain.prototype.runChainChangeCallbacks = function () {
  this.chainChangeCallbacks.forEach((cb) => {
    cb();
  });
};

export default Blockchain;

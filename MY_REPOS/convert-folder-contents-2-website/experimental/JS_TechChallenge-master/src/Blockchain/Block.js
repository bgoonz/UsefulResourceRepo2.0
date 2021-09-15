import blockTemplate from "./block.hbs";
import hash from "object-hash";
import { strToNode } from "../helpers";
import random from "random-hash";

/**
 * hashable.previous
 * hashable.data
 * hashable.nonce
 * hash
 */

class Block {
  constructor(previous, zeroRequirement, id) {
    this.id = id;

    Object.defineProperty(this, "zeroRequirement", {
      value: zeroRequirement,
      enumerable: true,
      configurable: false,
      writable: false,
    });

    this.block = {
      hashable: {
        previous,
        data: null,
        nonce: "",
      },
    };
    this.hash();
    this.oldEl = this.makeNode();
    this.parentEl = document.querySelector("#" + id);
    this.parentEl.appendChild(this.oldEl);
  }

  setData(data) {
    this.block.hashable.data = data;
    this.hash();
  }

  setNonce(nonce) {
    this.block.hashable.nonce = nonce;
    this.hash();
  }

  generateNonce() {
    this.setNonce(random({ length: 30 }));
  }

  mineNonce() {
    while (!this.isValid()) {
      this.generateNonce();
    }
  }

  setPreviousHash(previousHash) {
    this.block.hashable.previous = previousHash;
    this.hash();
  }

  hash() {
    this.block.hash = hash(this.block.hashable);
  }

  isValid() {
    const shouldBeZeros = this.block.hash.substr(0, this.zeroRequirement);
    return shouldBeZeros === Array(this.zeroRequirement + 1).join("0");
  }

  isDataEmpty() {
    return this.block.hashable.data === null;
  }

  render() {
    const el = this.makeNode();
    document.querySelector("#" + this.id).replaceChild(el, this.oldEl);

    this.oldEl = el;
  }

  makeNode() {
    return strToNode(
      blockTemplate({
        isValid: this.isValid() ? "valid-block" : "invalid-block",
        data: JSON.stringify(this.block.hashable.data, null, 2),
        nonce: this.block.hashable.nonce,
        previous: this.block.hashable.previous,
        hash: this.block.hash,
        actionButtonsDisabled:
          this.block.hashable.data === null ? "disabled" : "",
      })
    );
  }
}

export default Block;

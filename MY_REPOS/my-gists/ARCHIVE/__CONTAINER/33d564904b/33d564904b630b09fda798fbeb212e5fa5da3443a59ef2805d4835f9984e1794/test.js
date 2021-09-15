/* @flow */

export default class Element {
  get previousToken(): ?Element {
      if (this._parentElement) {
          return this._parentElement.previousToken;
      }

      return null;
  }

  _parentElement: Element;

  loc() {
      let prevToken = this.previousToken;
      while (prevToken) {
          let lines = ['asdf', 'asdf'];
          if (lines.length > 1) {
              while (prevToken) {
                  prevToken = prevToken.previousToken; // saying it's potentially null
              }
              break;
          }
          prevToken = prevToken.previousToken; // error here
      }
  }
}
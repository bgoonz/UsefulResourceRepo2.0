/* @flow */

class Element {
  replaceChildren(newElement: Object) {
        let children;
        if (newElement.isFragment) {
            children = []
        } else {
            if (newElement._parentElement) {
                throw new Error('Remove element before adding again');
            }
            children = []
        }

        this._setChildren(children);
    }

    _setChildren(newChildren: Array<any>) {}
}

// 4.js:16
//  16:         this._setChildren(children);
//              ^^^^^^^^^^^^^^^^^^^^^^^^^^^ call of method `_setChildren`
//  16:         this._setChildren(children);
//                                ^^^^^^^^ undefined. This type is incompatible with
//  19:     _setChildren(newChildren: Array<any>) {}
//                                    ^^^^^^^^^^ array type


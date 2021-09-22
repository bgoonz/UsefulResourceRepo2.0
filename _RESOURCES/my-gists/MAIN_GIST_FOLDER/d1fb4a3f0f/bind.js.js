'use strict';

/* eslint no-invalid-this: 1 */

const ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
const slice = Array.prototype.slice;
const toStr = Object.prototype.toString;
const funcType = '[object Function]';

export default function bind(that) {
    const target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    const args = slice.call(arguments, 1);

    let bound;
    const binder = function () {
        if (this instanceof bound) {
            const result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    const boundLength = Math.max(0, target.length - args.length);
    const boundArgs = [];
    for (let i = 0; i < boundLength; i++) {
        boundArgs.push(`$${i}`);
    }

    bound = Function('binder', `return function (${boundArgs.join(',')}){ return binder.apply(this,arguments); }`)(binder);

    if (target.prototype) {
        const Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

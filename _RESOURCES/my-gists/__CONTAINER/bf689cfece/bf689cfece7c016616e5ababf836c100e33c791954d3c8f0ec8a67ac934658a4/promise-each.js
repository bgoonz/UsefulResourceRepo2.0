YUI.add('promise-each', function (Y) {

    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    function isFunction(obj) {
        return obj && (typeof obj === 'function');
    }

    Y.Promise.each = function (values, fn, context) {
        var Promise = this;
        // down the rabbit hole...
        return new Promise(function (resolve, reject) {
            if (!isArray(values)) {
                reject(new TypeError('Promise.each expects an array of values or promises'));
                return;
            }

            if (!isFunction(fn)) {
                reject(new TypeError('Promise.each expects an iterator function'));
                return;
            }

            var i = 0,
                length = values.length,
                remain = length,
                result = [],
                chains;

            function chain(index) {
                return Promise.resolve(values[index])
                    .then(function (value) {
                        // cache resolved value for final resolution
                        result[index] = value;

                        // call iterator without caching return values
                        fn.call(context, value, index, values);

                        if (--remain === 0) {
                            resolve(result);
                        }
                    }, reject)      // reject when promise rejects
                    .catch(reject); // reject when iterator throws
            }

            if (length < 1) {
                return resolve(result);
            }

            // start chain with first value
            chains = chain(i++);

            // chain the rest of the values
            for (; i < length; i++) {
                chains = chains.then(chain(i), reject);
            }
        });
    };

}, '', { requires: ['promise'] });

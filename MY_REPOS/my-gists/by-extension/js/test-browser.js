YUI({
    modules: {
        'promise-each': {
            fullpath: './promise-each.js',
            requires: ['promise']
        }
    }
}).use('promise-each', function (Y) {
    Y.Promise.each(['foo', 'bar', Y.when('teapot'), 'baz'], function (val, idx) {
        if (idx === 1) {
            throw new Error('threw at index 1');
        }
        Y.log('"' + val + '" at index %d' + idx);
    })
        .then(function (result) {
            Y.log(result);
        })
        .catch(function (ex) {
            Y.error(ex);
        });
});

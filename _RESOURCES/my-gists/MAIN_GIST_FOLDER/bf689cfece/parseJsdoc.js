function parseJsdoc(code, _blocks, _expressions) {
    _blocks = [];
    // Find JSDoc blocks
    code.replace(/\/\*\*[\s\S]+?\*\//g, function (block) {
        _expressions = {};
        // Find @-expressions in each block
        block.replace(/@\S+[^@]+/g, function (expression) {
            expression = expression.replace(/\s*\*\/|\s+\*\s+/g, ' ').replace(/\s+$/, '').match(/@(\S+)\s+([\s\S]+)/);
            if (!expression) {
                return;
            }
            _expressions[expression[1]] = _expressions[expression[1]] || [];
            _expressions[expression[1]].push(expression[2].replace(/\s+\*$/g, ''));
        });
        _blocks.push(_expressions);
    });
    return _blocks;
}
#!/usr/bin/env node

var fs   = require('fs'),
    path = require('path'),

    yui_module = process.argv[2] ? path.join(process.cwd(), process.argv[2]) : 'yui',
    output     = process.argv[3],

    EXCLUDE_FILTERS = [
        /^cookie/,
        /^dom/,
        /^event-simulate/,
        /^file/,
        /^graphics/,
        /^node/,
        /^scrollview/,
        /^stylesheet/,
        /^uploader/,
        /-xml/
    ],

    Y      = require(yui_module).YUI(),
    loader = new Y.Loader(),
    modules, exclude, include, data;

loader.require(Object.keys(loader.moduleInfo));

modules = loader.resolve(true).jsMods;
exclude = {};
include = Y.Array.hash(Y.Env.core);

function valid(name) {
    return EXCLUDE_FILTERS.every(function (filter) {
        return !filter.test(name);
    });
}

modules.forEach(function (module) {
    if (module.langPack) { return; }

    var name = module.name;

    if (!valid(name)) {
        exclude[name] = true;
        return;
    }

    include[name] = true;

    if (Array.isArray(module.expanded))  {
        module.expanded.forEach(function (inc) {
            if (!valid(inc)) {
                exclude[name] = true;
                delete include[name];
            }
        });
    }
});

data = JSON.stringify({
    exclude: Object.keys(exclude).sort(),
    include: Object.keys(include).sort()
});

if (output) {
    fs.writeFileSync(output, (data + '\n'), 'utf8');
} else {
    console.log(data);
}

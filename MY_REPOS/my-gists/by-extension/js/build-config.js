/*jslint node:true, forin:true */

module.exports = function (grunt) {
    var path = require('path'),
        isArray = Array.isArray,
        template = 'ddc.utils.namespace("ddc.crm.modules.crm", <%= JSON.stringify(modules) %>);';

    grunt.registerMultiTask('build-config', 'Build the YUI config files', function () {
        var data = this.data,
            envs = data.envs,
            suffix = '/**/meta/*.json',
            srcs = isArray(data.src) ? data.src.map(function (it) { return it + suffix; }) : data.src + suffix,
            metas = grunt.file.expand(srcs),
            modules = {},
            out;

        function parseData(json, name, data, isSubmodule) {
            var property,
                submodule;

            for (property in data) {
                if (property === 'submodules') {
                    for (submodule in data[property]) {
                        parseData(json, submodule, data.submodules[submodule], true);
                    }

                    delete data.submodules;
                }
            }

            json[name] = data;
        }

        metas.forEach(function (metaPath) {
            var metaFile = grunt.file.readJSON(metaPath),
                key,
                value;


            for (key in metaFile) {
                value = metaFile[key];

                parseData(modules, key, value);
            }
        });

        grunt.file.write(data.dest, grunt.template.process(template, { data: { modules: modules } }));
    });
};

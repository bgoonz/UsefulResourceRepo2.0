#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs-extra');
const { getPackages } = require('@lerna/project');
const PackageGraph = require('@lerna/package-graph');

(async () => {
    const pkgs = await getPackages(__dirname);
    const graph = new PackageGraph(pkgs, 'allDependencies', true);
    const writes = [];

    for (const node of graph.values()) {
        const references = [];

        for (const result of node.localDependencies.values()) {
            references.push({
                path: path.relative(result.where, result.fetchSpec),
            });
        }

        if (references.length) {
            const tsconfigPath = path.join(node.location, 'tsconfig.json');

            writes.push(
                Promise.resolve()
                    .then(() => fs.readJSON(tsconfigPath))
                    .then(json =>
                        fs.outputJSON(
                            tsconfigPath,
                            {
                                ...json,
                                references,
                            },
                            { spaces: 2 }
                        )
                    )
            );
        }
    }

    await Promise.all(writes);
})();

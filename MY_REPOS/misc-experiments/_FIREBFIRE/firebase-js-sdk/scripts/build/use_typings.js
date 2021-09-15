/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

const { writeFileSync } = require('fs');
const { argv } = require('yargs');

const path = require('path');
const packageJsonPath = path.resolve(process.cwd(), './package.json');

// point typings field to supplied path in package.json
const TYPINGS_PATH = argv._[0];

if (!TYPINGS_PATH) {
  throw Error('Please supply a file path');
}
const packageJson = require(packageJsonPath);
packageJson.typings = TYPINGS_PATH;

console.log(
  `Pointing the typings field in ${packageJson.name} to ${TYPINGS_PATH}`
);

writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, {
  encoding: 'utf-8'
});

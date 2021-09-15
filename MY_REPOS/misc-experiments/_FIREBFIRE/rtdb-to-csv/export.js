// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const MAX_COLUMNS = 32;
const NULLS = ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,';

var request = require('request'),
    minimist = require('minimist'),
    es = require('event-stream'),
    zlib = require('zlib'),
    passthrough = require('stream').PassThrough,
    fs = require('fs'),
    streamparser = require('./streamparser');

// setup compression (by default)
var extract = zlib.createGunzip(),
    compress = zlib.createGzip();

var expectedArgKeys = ['inputURL', 'inputPath', 'outputPath', 'noCompressedInput', 'noCompressedOutput', 'fillWithNulls'];

var usage = function (err) {
  console.error(err);
  console.error('Usage: node export.js');
  console.error('  --inputURL http(s)://path/to/input: (required OR inputPath) location of source json');
  console.error('  --inputPath /path/to/input: (required OR inputURL) location of source json');
  console.error('  --outputPath /path/to/output: (required) location to write output');
  console.error('  --noCompressedInput (optional): use flag if input is NOT gzipped');
  console.error('  --noCompressedOutput (optional): use flag if output should NOT be gzipped');
  console.error('  --fillWithNulls (optional): fill empty columns with NULL');
};

var argv = minimist(process.argv.slice(2), {
  string: ['inputURL', 'inputPath', 'outputPath'],
  boolean: ['noCompressedInput', 'noCompressedOutput', 'fillWithNulls'],
  unknown: function(input) {
    usage('unknown argument: ' + input);
    process.exit(1);
  }
});
console.log('args:', argv);

// parse args
if (!((!argv.inputURL && argv.inputPath) || (argv.inputURL && !argv.inputPath))) {
  return usage("must specify either inputURL OR inputPath");
}
if (!argv.outputPath) {
  return usage("must specify outputPath");
}
if (argv.noCompressedInput) {
  extract = new passthrough();
}
if (argv.noCompressedOutput) {
  compress = new passthrough();
}

// setup streams
var output = compress.pipe(fs.createWriteStream(argv.outputPath));

var parser = streamparser.getParser();
parser.on('data', function (data) {
  for (var i = 0; i < data.value.length; i++) {
    // From the CSV RFC4180 page: "If double-quotes are used to enclose fields, then a double-quote appearing inside a field must be escaped by preceding it with another double quote."
    data.value[i] = ('' + data.value[i]).replace(/"/g, '""');
  }
  var s = '"' + data.value.join('","') + '"';
  if (argv.fillWithNulls) {
    s +=  NULLS.substring(data.value.length - 1, MAX_COLUMNS - 1);
  }
  s += '\n';
  output.write(s);
});

parser.on('end', function () {
  output.end();
  console.log('done');
});

// parse!
if (argv.inputURL) {
  request({url: argv.inputURL})
    .pipe(extract)
    .pipe(parser);
} else if (argv.inputPath) {
  fs.createReadStream(argv.inputPath)
    .pipe(extract)
    .pipe(parser);
}

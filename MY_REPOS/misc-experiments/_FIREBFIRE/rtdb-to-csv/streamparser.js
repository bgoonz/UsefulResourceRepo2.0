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

var Jsonparse = require('jsonparse'),
    through = require('through');

/*
 * Parse streaming JSON.
 */
exports.getParser = function () {
  var parser = new Jsonparse();

  var jsonstream = through(
    /* write(data) */
    function (data) {
      parser.write(('string' === typeof data)?new Buffer(data):data);
    },
    /* end() */
    function () {
      jsonstream.emit('end');
    }
  );

  var startDate = new Date();
  var logStatus = function () {
    var elapsedSec = (new Date().getTime() - startDate.getTime()) / 1000;
    var minutes = Math.floor(elapsedSec / 60);
    var seconds = Math.floor(elapsedSec) % 60;
    console.log('wrote ' + rows + ' rows.',
                'elapsed: ' + minutes + 'm' + seconds + 's');
  };

  var rows = 0;
  parser.onValue = function (v) {
    for (var k in this.value) {
      // only process leaves
      if ('object' !== typeof this.value[k]) {
        // concat all keys as a path, and finally the value
        var existingKeys = this.stack
                               .slice(1)
                               .map(function (e) { return e.key; });
        jsonstream.queue({
          value: existingKeys.concat([k, v])
        });
        if (++rows % 100000 == 0) {
          logStatus();
        }
      }
      // remove the processed value from the map
      delete this.value[k];
    }
  };

  parser.onError = function (e) {
    jsonstream.emit('error', e);
  };

  return jsonstream;
};

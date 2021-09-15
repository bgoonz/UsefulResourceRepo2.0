var express = require('express'),
  fs = require('fs'),
  template = require('lodash').template,
  refStatus = require('./references/status').status;

var app = module.exports = express();

app.engine('html', render);
app.set('view engine', 'html');
app.set('views', __dirname + '/../templates');

app.get('/', function (req, res) {
  var references = app.get('references');

  refStatus(app.get('ghClient'), references, function (err, statuses) {
    references.map(function (ref, index) {
      ref.status = statuses[index][0];
    });
    res.render(app.get('template'), { references: references, refresh: app.get('refresh') });
  });
});

function render(path, options, callback) {
  var file = fs.readFileSync(path).toString();
  callback(null, template(file, options));
}
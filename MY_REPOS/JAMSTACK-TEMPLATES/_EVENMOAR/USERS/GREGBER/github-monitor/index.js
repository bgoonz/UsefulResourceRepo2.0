var github = require('octonode');

var client = github.client('817b59dc31382db1f87d7ae571346cb89a66f0a0');

var ghrepo = client.repo('lemonde/cms');

ghrepo.statuses('master', function (err, res) {
  console.log('error', err);
  console.log('res', res);
});
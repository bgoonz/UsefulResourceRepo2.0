#!/usr/bin/env casperjs

/*
* Takes provided URL passed as argument and make screenshots of this page with several viewport sizes.
* These viewport sizes are arbitrary, taken from iPhone & iPad specs, modify the array as needed
*
* Usage:
* $ casperjs screenshots.js example.com
*/

var casper = require('casper').create();

var screenshotUrl = 'http://google.com/',
    screenshotNow = new Date(),
    screenshotDateTime = screenshotNow.getFullYear() + pad(screenshotNow.getMonth() + 1) + pad(screenshotNow.getDate()) + '-' + pad(screenshotNow.getHours()),
    viewports = [
      {
        'name': 'smartphone',
        'viewport': {width: 455, height: 708}
      },
      {
        'name': 'tablet',
        'viewport': {width: 780, height: 585}
      },
      {
        'name': 'desktop',
        'viewport': {width: 1200, height: 750}
      }
    ];

if (casper.cli.args.length < 1) {
  casper
    .echo("Usage: $ casperjs screenshots.js http://example.com")
    .exit(1)
  ;
} else {
  raw_url = casper.cli.args[0];
  full_url = add_http(raw_url);
}

casper.start(full_url, function() {
  this.echo('Current location is ' + this.getCurrentUrl(), 'info');
});

casper.each(viewports, function(casper, viewport) {
  this.then(function() {
    this.viewport(viewport.viewport.width, viewport.viewport.height);
  });
  this.thenOpen(full_url, function() {
    this.wait(5000);
  });
  this.then(function(){
    this.echo('Screenshot for ' + viewport.name + ' (' + viewport.viewport.width + 'x' + viewport.viewport.height + ')', 'info');
    this.capture('screenshots/' + screenshotDateTime + '/' + raw_url + '-' + viewport.name + '-' + viewport.viewport.width + 'x' + viewport.viewport.height + '.png', {
        top: 0,
        left: 0,
        width: viewport.viewport.width,
        height: viewport.viewport.height
    });
  });
});

casper.run();

function pad(number) {
  var r = String(number);
  if ( r.length === 1 ) return '0' + r;
}

function add_http(url) {
  if (!/^https?:\/\//.test(url)) return "http://" + url;
}
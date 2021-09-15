var express = require('express'),
    Locator = require('locator'),
    app = express();

require('express-yui').augment(app);

new Locator({
    buildDirectory: 'build'
})
    .plug(app.yui.plugin({
        registerGroup: true
    }))
    .parseBundle(__dirname, {}).then(function () {

        console.log('Groups generated under: ' + __dirname + '/build');

        console.log('YUI_config = ' + JSON.stringify(app.yui.config()));

        console.log('Seed files: ' + app.yui.getSeedUrls());

    }, function (err) {
        console.error(err);
        console.error(err.stack);
    });

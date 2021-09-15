var page = require('webpage').create(),
    t, address;

if (phantom.args.length === 0) {
    console.log('Usage: dumpExtLoader.js <some URL>');
    phantom.exit();
} else {
    page.onConsoleMessage = function (msg) {
        console.log(msg);
    };
    address = phantom.args[0];
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
        } else {
            page.evaluate(function(){
                Ext.onReady(function() {
                    Ext.Loader.history.forEach(function(item) {
                        console.log(Ext.Loader.getPath(item));
                    });
                    phantom.exit();
                });
            });
        }
    });
}

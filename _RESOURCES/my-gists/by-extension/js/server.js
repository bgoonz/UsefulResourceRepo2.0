var cluster         = require('cluster');
var myproj          = require('myproj');
var myproj_opts     = require('myproj_opts'); // uses 'opt' module available in NPM
var os              = require('os');

/** Ferris Bueller, you're my hero */
var env = myproject.settings.environment;
if(env !== "local" && env !== "test"){
    if(cluster.isMaster){
        os.cpus().forEach(function(){
            cluster.fork();
        });
        console.log("API server listening on port %d", myproj_opts.port);

        cluster.on('exit', function(worker) {
            console.log('worker ' + worker.pid + ' died');
            cluster.fork();
        });
    } else {
        require('./app.js').listen(myproj_opts.port);
    }
} else { // don't cluster on local or test
    require('./app.js').listen(myproj_opts.port);
    console.log("API server listening on port %d", myproj_opts.port);
}
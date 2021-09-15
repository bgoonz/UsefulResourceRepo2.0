// This belongs in %SDK%/compat/scripts/
(function() {

    var defaultJsb3Object = {
        "projectName": "Project Name",
        "licenseText": "Copyright(c) 2012 Company Name",
        "builds": [
            {
                "name": "All Classes",
                "target": "all-classes.js",
                "options": {
                    "debug": true
                },
                "files": []
            },
            {
                "name": "Application - Production",
                "target": "app-all.js",
                "compress": true,
                "files": [
                    { path: '', name: 'all-classes.js' },
                    { path: '', name: 'app.js' }
                ]
            }
        ],
        "resources": []
    };

    function cleanPath(path) {
        return path.replace(/\/\.\.\//g, '/');
    }

    function parseArguments() {
        var args = { targets: [] },
            key = null,
            i, ln, arg, match;

        for (i = 0,ln = phantom.args.length; i < ln; i++) {
            arg = phantom.args[i];

            if (key !== null) {
                if (!arg.match(/^-{1,2}([^-])/i)) {
                    args[key] = arg;
                    key = null;
                    continue;
                }

                args[key] = true;
                key = null;
            }

            if ((match = arg.match(/^--(.+)$/i)) || (match = arg.match(/^-(.+)$/i))) {
                key = match[1];
            }
            else if (match = arg.match(/^--([^=]+)=(.*)$/i)) {
                args[match[1]] = match[2];
            }
            else if (match = arg.match(/^-([\w]+)$/i)) {
                match[1].split('').forEach(function(a) {
                    args[a] = true;
                });
            }
            else {
                args.targets.push(arg);
            }
        }

        if (key !== null) {
            args[key] = true;
        }

        return args;
    }

    function getRelativePath(from, to) {
        var fromParts = from.split('/'),
            toParts = to.split('/'),
            index = null,
            i, ln;

        for (i = 0,ln = toParts.length; i < ln; i++) {
            if (toParts[i] !== fromParts[i]) {
                index = i;
                break;
            }
        }

        if (index === null || index === 0) {
            return from;
        }

        from = fromParts.slice(index).join('/');

        for (i = 0; i < ln - index - 1; i++) {
            from = '../' + from;
        }

        return from;
    }

    function navigateObject(object, target) {
        var ret = object,
            originalTarget = target,
            expect = function(expected) {
                if (typeof expected === 'string') {
                    var ln = expected.length;

                    if (target.substring(0, ln) === expected) {
                        target = target.slice(ln);

                        return expected;
                    }

                    return null;
                }

                var result = target.match(expected);

                if (result !== null) {
                    target = target.slice(result[0].length);
                    return result[0];
                }

                return null;
            },
            push = function(property) {
                if (!ret.hasOwnProperty(property)) {
                    throw new Error("Invalid target property name " + property);
                }

                ret = ret[property];
            },
            name, bracket, dot, quote;

        while (target.length > 0) {
            name = expect(/^[\w]+/i);

            if (name !== null) {
                push(name);
                continue;
            }
            else {
                bracket = expect(/^\[/);

                if (bracket !== null) {
                    quote = expect(/^'|"/);

                    push(expect(new RegExp('^[^\\]' + (quote ? quote[0] : '') + ']+', 'i')));

                    if (quote !== null) {
                        expect(quote[0]);
                    }

                    expect(/^\]/);

                    continue;
                }
                else {
                    dot = expect(/^\./);

                    if (dot !== null) {
                        push(expect(/^[\w]+/i));
                        continue;
                    }
                }
            }

            throw new Error("Malformed target: '" + originalTarget + "', failed parsing from: '" + target + "'. Expected target " +
                "in JSON format, e.g. 'builds[0].files'");
        }

        return ret;
    }

    var args = parseArguments(),
        writeTarget = args.target || 'builds[0].files',
        verbose = !!args.verbose,
        appLocation = args['app-entry'],
        jsb3Path = args['project'],
        fs = require('fs'),
        jsb3Content, jsb3Object, targetObject,
        pathParts, fileName, dependencies, timer, elapse;

    if (!appLocation) {
        throw new Error("Missing required 'app-entry' argument");
    }

    if (!jsb3Path) {
        throw new Error("Missing required 'project' argument");
    }

    if (fs.exists(jsb3Path)) {
        try {
            jsb3Content = fs.read(jsb3Path);
            jsb3Object = JSON.parse(jsb3Content);
        } catch (e) {
            throw new Error("Failed parsing JSB file: " + jsb3Path + ". Please make sure its content is of valid JSON format");
        }
    }
    else {
        jsb3Object = defaultJsb3Object;
    }

    targetObject = navigateObject(jsb3Object, writeTarget);
    targetObject.length = 0; // Wipe out the target array

    function error(message) {
        console.log(message);
        phantom.exit(1);
    }

    var page = new WebPage();

    page.settings.localToRemoteUrlAccessEnabled = true;
    page.settings.ignoreSslErrors = true;

    page.onConsoleMessage = function(message, url, lineNumber) {
        console.log((url ? url + " " : "") + (lineNumber ? lineNumber + ": " : "") + message);
    };

    page.onError = function (msg, trace) {
        console.log(msg);
        trace.forEach(function(item) {
            console.log('  ', item.file, ':', item.line);
        });
        phantom.exit(1);
    };

    if (!/^file:\/\/|http(s?):\/\//.test(appLocation)) {
        appLocation = 'file:///' + fs.absolute(appLocation).replace(/\\/g, '/');
    }

    page.open(appLocation, function(status) {
        if (status !== 'success') {
            error("Failed opening: '" + appLocation + "'. Please verify that the URI is valid");
        }

        page.evaluate(function() {
            window.onerror = function(message, url, lineNumber) {
                console.log((url ? url + " " : "") + (lineNumber ? lineNumber + ": " : "") + message);
            };

            Ext.onReady(function() {
                var documentLocation = document.location,
                    currentLocation = documentLocation.origin + documentLocation.pathname + documentLocation.search,
                    dependencies = [],
                    path;

                function getRelativePath(from, to) {
                    var fromParts = from.split('/'),
                        toParts = to.split('/'),
                        index = null,
                        i, ln;

                    for (i = 0, ln = toParts.length; i < ln; i++) {
                        if (toParts[i] !== fromParts[i]) {
                            index = i;
                            break;
                        }
                    }

                    if (index === null || index === 0) {
                        return from;
                    }

                    fromParts = fromParts.slice(index);

                    for (i = 0; i < ln - index - 1; i++) {
                        fromParts.unshift('..');
                    }

                    for (i = 0, ln = fromParts.length; i < ln; i++) {
                        if (fromParts[i] !== '..' && fromParts[i+1] === '..') {
                            fromParts.splice(i, 2);
                            i -= 2;
                            ln -= 2;
                        }
                    }

                    return fromParts.join('/');
                }

                // Wait for Ext.Loader to finish everything.
                // Note that Ext.Loader.onReady doesn't have the desired behavior. It seems the best way
                // to ensure that it's done is to just wait it out.
                setTimeout(function(){
                    Ext.Loader.history.forEach(function(item) {
                        path = Ext.Loader.getPath(item);
                        path = getRelativePath(path, currentLocation);

                        pathParts = path.split('/');
                        fileName = pathParts.pop();
                        path = pathParts.join('/');

                        if (path !== '') {
                            path += '/';
                        }

                        dependencies.push({
                            path: path,
                            name: fileName,
                            clsName: item
                        });
                    });

                    Ext.__dependencies = dependencies;
                }, 5000);

                
            });
        });

        timer = setInterval(function() {
            dependencies = page.evaluate(function() {
                return Ext.__dependencies;
            });

            if (dependencies) {
                clearInterval(timer);
                targetObject.push.apply(targetObject, dependencies);
                jsb3Content = JSON.stringify(jsb3Object, null, 4);
                fs.write(jsb3Path, jsb3Content, 'w');
                if (verbose) {
                    console.log(jsb3Content);
                }
                phantom.exit(0);
            }

            elapse += 100;

            if (elapse > 10000) {
                clearInterval(timer);
                error("Timeout waiting for Ext.onReady to fire. Try using ext-dev.js to pinpoint this issue.");
            }
        }, 100);
    });

})();


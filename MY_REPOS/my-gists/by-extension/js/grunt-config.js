    grunt.initConfig({
        // Runs the YUI3 build tool on a directory. Docs: <http://yui.github.io/shifter/>
        "shifter": {
            "crm-src": {
                // (optional) version - What to fill in on the "@VERSION@" field in built files
                "version": "CRM",
                // (optional) lint can be 'config' or false
                // if "config", shifter will use the nearest .jshintrc JSON file as JSHint config
                // if "false", shifter will skip the lint step entirely.
                "lint" : "config",
                
                // src is the root directory to run shifter --walk.
                "src"  : "apps/ui/web-app/js/crm-src",
                
                // (optional) dest is the build directory. If missing, it places in {src}/../build/
                "dest" : "apps/ui/web-app/js/crm-build"
            }
        }
    });
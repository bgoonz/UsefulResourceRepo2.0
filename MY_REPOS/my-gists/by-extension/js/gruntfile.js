    grunt.initConfig({
        // Build a module configuration based on the meta.json files it finds.
        "build-config": {
            "crm-src": {
                src : 'apps/ui/web-app/js/crm-src',
                dest: 'apps/ui/web-app/js/crm-build/crm-config.js'
            }
        }
    });
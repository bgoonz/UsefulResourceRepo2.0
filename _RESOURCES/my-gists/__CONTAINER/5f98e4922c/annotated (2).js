function (
modules, // map of modules
main,    // main module function
module,  // tmp var
inited_modules // list of inited modules
) {
    inited_modules = {}; // init
    main(function require(moduleName) { // pass require fucntion only
        module = modules[moduleName];
        if (!inited_modules[moduleName]) { // lazy init
            try {
                if (module[0]=='(') { // its a lazy module
                    module = (0,this.eval)(module); // global eval it!
                }
                module = module(require); // lazy module init
            } catch(e){}
        }
        inited_modules[moduleName] = 1; // mark module as inited
        return modules[moduleName] = module; // return
    });
}
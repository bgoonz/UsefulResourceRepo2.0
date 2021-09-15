function (
  argv,   // {String} argv
  item,   // argv item
  result, // result hash
  i       // counter
){
    result = {}; // reset
    for(
        argv = argv.split(/\s*\B[\/-]+([\w-]+)[\s=]*/), // use special regexp 
                                             // "node pewpew.js --p a -c -d" ~~magic~~> 
                                             // ["node pewpew.js", "p", "a", "c", "", "d", ""]
        i = 1; // skip 1 item ("node pewpew.js")

        item = argv[i++]; // while !eoargv

        result[item] = argv[i++] || !0 // set value, default true
    );
    return result;
}
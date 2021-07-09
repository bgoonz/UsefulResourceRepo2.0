function (
paths,  // {String[]} list of absolute paths
parts,  // path parts
target, // pointer to current subtree
file,   // path item
fs      // result fs tree
) {
    // init fs, reset pointer, get item
    for (fs = {};target = fs,parts = paths.pop();) {
        parts = ('#' + parts).split('/'); // split path
        while (parts[0]) { // while !eopath
            target = target[file = parts.shift()]   // set current pointer to file
                   = parts[0] ? target[file] || {}  // !last -> its a dir
                              : file;               // else -> file
        }
    }
    return fs;
}
// -- updated in 2020/04/19 covering the issues in the comments to this point
// -- remember you also have things like `ensureDirSync` from https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureDir-sync.md
const fs = require('fs')

function writeFileSyncRecursive(filename, content, charset) {
  // -- normalize path separator to '/' instead of path.sep, 
  // -- as / works in node for Windows as well, and mixed \\ and / can appear in the path
  let filepath = filename.replace(/\\/g,'/');  

  // -- preparation to allow absolute paths as well
  let root = '';
  if (filepath[0] === '/') { 
    root = '/'; 
    filepath = filepath.slice(1);
  } 
  else if (filepath[1] === ':') { 
    root = filepath.slice(0,3);   // c:\
    filepath = filepath.slice(3); 
  }

  // -- create folders all the way down
  const folders = filepath.split('/').slice(0, -1);  // remove last item, file
  folders.reduce(
    (acc, folder) => {
      const folderPath = acc + folder + '/';
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
      return folderPath
    },
    root // first 'acc', important
  ); 
  
  // -- write file
  fs.writeFileSync(root + filepath, content, charset);
}


// -- Tests done that work properly:
// -- both in WSL and CMD
// writeFileSyncRecursive('data.json', '{}', 'utf8');
// writeFileSyncRecursive('public/new-user/data.json', '{}', 'utf8');
// writeFileSyncRecursive('public\\new-user\\data.json', '{}', 'utf8');
// writeFileSyncRecursive('./public/new-user/data.json', '{}', 'utf8');
// writeFileSyncRecursive('.\\public\\new-user\\data.json', '{}', 'utf8');
// writeFileSyncRecursive('/tmp/public\\new-user\\data.json', '{}', 'utf8');
// -- only in WSL (in CMD creates a 'C:\c' folder)
// writeFileSyncRecursive('/c/tmp/writefilesync/public/new-user/data.json', '{}', 'utf8');
// -- only in CMD (in WSL throws error  no such file or directory c:/tmp)
// writeFileSyncRecursive('c:\\tmp\\writefilesync\\public\\new-user\\data.json', '{}', 'utf8');
// writeFileSyncRecursive('c:/tmp/writefilesync/public/new-user/data.json', '{}', 'utf8');


/*
// works well only with relative paths
// asumes paths passed with / separator even in windows
function writeFileSyncRecursive (filename, content, charset) {
  // create folder path if not exists
  filename.split('/').slice(0,-1).reduce( (last, folder)=>{
    let folderPath = last ? (last + '/' + folder) : folder
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath)
    return folderPath
  },'');  // fixed missing second parameter of reduce 
  
  fs.writeFileSync(filename, content, charset)
}
*/
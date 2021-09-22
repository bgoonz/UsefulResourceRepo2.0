export function lookup(files, cwd, path = '') {
  const segments = path.split('/').filter((s) => s);
  const startingDir = cwd ? lookup(files, '', cwd) : files;
  return segments.reduce(((dir, segment) => dir && dir[segment]), startingDir);
}

export function walkFiles(files, cwd, folder, fn)  {
  const dir = lookup(files, cwd, folder);
  Object.keys(dir).forEach((name) => {
    const fullName = folder ? `${folder}/${name}` : name;
    if (name.match(/^\./)) { return; }
    if (typeof dir[name] === 'object') {
      walkFiles(files, cwd, fullName, fn);
    } else {
      fn(fullName, dir[name]);
    }
  });
}

const fs = require('fs');
const glob = require('glob');
const recast = require('recast');
const types = recast.types;

function compile(filepath) {
  const source = fs.readFileSync(filepath).toString();
  const ast = recast.parse(source);

  types.visit(ast, {
    visitIdentifier(path) {
      let name = path.value.name;
      if (/^.+_/.test(name)) {
        name = name.replace(/_(.)/g, (match, char, offset) => {
          return offset === 0 ? match : char.toUpperCase();
        });
        path.get('name').replace(name);
      }
      return false;
    }
  });

  fs.writeFileSync(filepath, recast.print(ast).code);
}


glob('src/**/*.js', (err, files) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  files.forEach(compile);
});

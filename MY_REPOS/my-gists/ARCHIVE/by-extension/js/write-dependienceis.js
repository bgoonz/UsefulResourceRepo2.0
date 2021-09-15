const importModules = require('import-modules');
const fs = require('fs');
const modules = importModules('./');

console.log(modules);
//=> {fooBar: [Function], bazFaz: [Function]}


const content = `${JSON.stringify(modules)}`;

try {
    const data = fs.writeFileSync('./test.json', content)
    fs.writeFile('test1.js', content, {
        flag: 'a+'
    }, err => {})
    //file written successfully
} catch (err) {
    console.error(err)
}
const fetch = require('node-fetch')
const dash = require('dashdash');
const fs = require('fs')

const options = {
    allowUnknown: true,
    options: [{
        names: ['output', 'o'],
        type: 'string',
        help: 'file in which to store the fetched content'
        },  
        {
            names: ['help', 'h'],
            type: 'bool',
            help: 'print this help and exit' 
        }],
        
    };

    
const parser = dash.createParser(options);

const opts = parser.parse(options);
console.log('Options are:', opts);
console.log(opts._args[0])

let url = opts._args[0]
let fileOutput = opts.output
console.log(fileOutput)


fetch(url)
    .then(res => res.text())
    .then(res2 => { 
        console.log(res2)
        fs.promises.writeFile(fileOutput, res2)
    })
    .catch((error) => {
        console.log(error.message)
        if (error.code === 'ENOTFOUND'){

            let host = error.message.split(' ')
           console.log('curl: (6) Could not resolve host:', host[7])  
           process.exit(6)
        }
    })
const fetch = require('node-fetch');
// Fetching data from an API
fetch(`https://api.github.com/users/mjshuff23`)
    .then((res) => res.json())
    .then((json) => console.log(json.location))
    .catch((reason) => {
        console.log(`rejected because `, reason);
    });

// const fetch = require('node-fetch');
// 
// (async () => {
//   const where = encodeURIComponent(JSON.stringify({
//     "name": {
//       "$exists": true
//     }
//   }));
//   const response = await fetch(
//     `https://parseapi.back4app.com/classes/Continentscountriescities_Continent?count=1&limit=0&where=${where}`,
//     {
//       headers: {
//         'X-Parse-Application-Id': '3OKMYGsm4jXhozc5K0Cg14opKJWji78LZg6NXCk4', // This is your app's application id
//         'X-Parse-REST-API-Key': 'UsULM0nYlKqLUpq9gs195N9nzyqP1tnhgmLv2TnU', // This is your app's REST API key
//       }
//     }
//   );
//   const data = await response.json(); // Here you have the data that you need
//   console.log(JSON.stringify(data, null, 2));
// })();



const fetch = require( 'node-fetch' );

( async () => {
  const where = encodeURIComponent( JSON.stringify( {
    "name": {
      "$exists": true
    }
  } ) );
  const response = await fetch(
    `https://parseapi.back4app.com/classes/Continentscountriescities_City?count=1&limit=0&where=${where}`, {
      headers: {
        'X-Parse-Application-Id': '3OKMYGsm4jXhozc5K0Cg14opKJWji78LZg6NXCk4', // This is your app's application id
        'X-Parse-REST-API-Key': 'UsULM0nYlKqLUpq9gs195N9nzyqP1tnhgmLv2TnU', // This is your app's REST API key
      }
    }
  );
  const data = await response.json(); // Here you have the data that you need
  console.log( JSON.stringify( data, null, 2 ) );
} )();

/*
node app.js {
    "results": [],
    "count": 1362963
  } |
  12: 39: 58 | bryan @LAPTOP - 9 LGJ3JGS: [ back4app - starwars - API ] back4app - starwars - API_exitstatus: 0 __________________________________________________________o >


*/

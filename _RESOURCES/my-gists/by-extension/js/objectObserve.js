
/*

  Example for Object.observe
  
  Polyfill: https://github.com/MaxArt2501/object-observe
  
  Detects: Add, Update, Delete properties
  
  Supported Browser: http://caniuse.com/object-observe
  
*/


var myObj = {
  name: 'Gokul'
};

Object.observe(myObj, function (changes) {
  //changes argument will come as an array
  
  //Check if changes is occured
  if (changes[0] !== undefined) {
    //Added new property to myObj
    if (changes[0].type === 'add') {
      console.log('Added a new property ----->', changes[0]);
    }
    
    //Deleted a property to myObj
    else if (changes[0].type === 'delete') {
      console.log('Deleted a property ----->', changes[0]);
    }
    //Updated a property to myObj
    else if (changes[0].type === 'update') {
      console.log('Updated a property ----->', changes[0]);
    }
  }
  
});




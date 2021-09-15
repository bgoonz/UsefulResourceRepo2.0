const fruits = () => {
  if (true) {
    var fruit1 = "appel";
    let fruit2 = "banana";
    const fruit3 = "kiwi";
    console.log(fruit2);
    console.log(fruit3);
  }
  console.log(fruit1);
  // console.log(fruit2)//no deja let
  // console.log(fruit3)// no deja const
};
fruits();

let x = 1;
{
  let x = 2;
  //con var en este caso si se remplazaria x  y daria 2 en los dos console.log
  //cuando son funciones no ocurre este problema, ver el archivo de function
  console.log(x);
}
console.log(x);

const anotherFunction = () => {
  for (
    let i = 0;
    i < 10;
    i++ //con var todo dara 10
  ) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  }
};

anotherFunction();

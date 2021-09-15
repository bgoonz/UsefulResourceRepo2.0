(function trial() {
  console.log(this);
})();

// trial(); //Since trial is a function expression above that therefore means that we cannot invoke it as a normal function afterwards.
// ABOVE INVOCATION WILL GIVE Reference error

function hola() {
  console.log(this);
  function jello() {
    console.log(this);
  }
  jello();
}

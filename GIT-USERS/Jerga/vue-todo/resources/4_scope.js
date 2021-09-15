const globalScope = "globalScope";
function a() {
  const aScope = "sScope";
  console.log(aScope);
  console.log(globalScope);

  function b() {
    const bScope = "bSCope";
    console.log(aScope);
    console.log(globalScope);
  }

  if (5 > 3) {
    const ifScope = "ifScope";
    console.log(aScope);
    // console.log(bScope)
    console.log(globalScope);
  }

  // console.log(bScope)
  // console.log(ifScope)

  b();
}

a();

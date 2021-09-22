function functionA() {
  // "const" is like "var"
  // it's like saying var greeting = "Hello from ..."
  // There are some differences I will be talking about later in lecture
  const greeting = "Hello from FunctionA";
  console.log("Hello from FunctionA");

  functionB("Ola");
  console.log("Execution is almost finished");
  const lastMessage = "Bye Bye";
  functionE();
  console.log(lastMessage);
}

function functionB(greeting) {
  const name = "Filip";
  console.log(greeting + " Filip");
  functionC();
  console.log("Done done done");
}

function functionC() {
  console.log("Not Much to do :(");
  const hmm = functionD(7 + 7);
  console.log(hmm);
}

function functionD(sum) {
  const times2 = sum * 2;
  console.log(times2);
  return times2;
}

function functionE() {
  console.log("Annoying Here");
}

functionA();

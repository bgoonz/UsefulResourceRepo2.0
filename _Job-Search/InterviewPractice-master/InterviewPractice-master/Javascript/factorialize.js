function factorialize(num) {
  let final = 1;

  for (let i = 1; i <= num; i++) {
    final *= i;
  }

  return console.log(final);
}

factorialize(5);

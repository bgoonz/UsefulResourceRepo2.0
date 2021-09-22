const pet = {
  type: "dog",
  name: "Fido",
};

function petName({ type, name }) {
  console.log(`You have a ${type} whose name is ${name}`);
}

petName(pet);

const dog = {
  breed: "German Shepard",
  age: 5,
  children: 3,
  isAfterInjury: true,
  vacination: {
    vacination1: true,
    vacination2: false,
  },
};

if (dog.breed === "German Shepard" && dog.age > 3) {
  console.log("Waf Waf!");
} else {
  console.log("Dog is sad :(");
}

if (dog.children <= 3 && dog.isAfterInjury === false) {
  console.log("Waf Waf!");
} else {
  console.log("Dog is sad :(");
}

if (dog.vacination.vacination1) {
  console.log("Waf Waf!");
} else {
  console.log("Dog is sad :(");
}

if (
  (dog.children > 2 || dog.vacination.vacination1 === true) &&
  dog.vacination.vacination2 === true
) {
  console.log("Waf Waf!");
} else {
  console.log("Dog is sad :(");
}

// Tricky one! Why is "!" in front of expresion ?
if (!dog.isAfterInjury) {
  console.log("Waf Waf!");
} else {
  console.log("Dog is sad :(");
}

// Strict operators
if (2 == "2") {
  console.log("Whaaaat ?");
} else {
  console.log("Hmmmmm :(");
}

if (2 === "2") {
  console.log("Whaaaat ?");
} else {
  console.log("Hmmmmm :(");
}

if (1 === true) {
  console.log("Whaaaat ?");
} else {
  console.log("Hmmmmm :(");
}

if (1 == true) {
  console.log("Whaaaat ?");
} else {
  console.log("Hmmmmm :(");
}

if (0 === false) {
  console.log("Whaaaat ?");
} else {
  console.log("Hmmmmm :(");
}

if (0 == false) {
  console.log("Whaaaat ?");
} else {
  console.log("Hmmmmm :(");
}

/* eslint-disable */

// export default function() {
//   // console.log('Hello World!!!!!!')

//   // 2 VARIABLES
//   // var firstName = "Filip" // string
//   // var age = 28 // number
//   // var isMale = true // boolean
//   // var dontKnow = null // unknow value
//   // var a

//   // var person = {
//   //   name: 'Filip',
//   //   lastName: 'Jerga'
//   // }

//   // Create all types of variables of your choice
//   // Check their types with "typeof"
//   // 2 VARIABLES

//   // var person = {
//   //   name: 'Filip',
//   //   lastName: 'Jerga'
//   // }

//   // var person1 = {
//   //   name: 'John',
//   //   lastName: 'Snow'
//   // }

//   // function printUserInfo(user) {
//   //   debugger
//   //   console.log('Consoling log out person informations!')
//   //   console.log('Hello ' + user.name + ' ' + user.lastName)
//   // }

//   // printUserInfo(person)
//   // printUserInfo(person1)

//   // var hours = 23
//   // var seconds = hours * 60 * 60
//   // console.log(seconds)

//   function transformHoursToSeconds(hours) {
//     return hours * 60 * 60
//   }

//   // var result = transformHoursToSeconds(19)
//   // console.log(result)

//   function printSomething(something) {
//     console.log(something)
//   }

//   // 36000
//   printSomething(transformHoursToSeconds(10))
//   // Annonymous functon

//   // Hello world
//   // Hello Filip, Good job with coding!
//   printSomething((function() {
//     console.log('Hello world')
//     return 'Hello Filip, Good job with coding!'
//   }()))

//   // {a: 1, b: 2}
//   printSomething({a: 1, b: 2})

//   function countPersonBirthYear(personAge) {
//      var currentYear = 2019
//      var birthYear = currentYear - personAge
//      return birthYear
//   }

//   var resolvedYear = countPersonBirthYear(33)
//   console.log(resolvedYear)

// }

// TODO: Create function called "countPersonBirthYear"
// specify 1 param: personAge
// in function body resolve person year of birth from passed age
// return year of birth from function
// call function "countPersonBirthYear" and assign returned value to
// variable called "resolvedYear"
// console.log out resolvedYear

// export default function() {

//   var result = 7 + 1
//   var result2 = 7 / 1
//   var result3 = 7 % 2
//   var result4 = 7 - 1
//   var result5 = 7 / 0
//   var result6 = 7 * 0

//   var b = 9
//   var result7 = ++b
//   var a = 7
//   var result8 = --a
//   var result9 = "Filip" + "Jerga"
//   var result10 = "1" + 2
//   var result11 = 2 + "1"
//   var result12 = 3 + 3 + "1"
//   var result13 = 7 - "2"
//   var result14 = "8" / "4"
//   var result15 = 2 ** 3

//   debugger
//   result13 -= 2
//   result15 += 7
// }

// export default function() {
//   const a = "Filip"
//   // a = "Peter"

//   let b = 28

//   b = 14
//   function functionA() {
//     // "const" is like "var"
//     // it's like saying var greeting = "Hello from ..."
//     // There are some differences I will be talking about later in lecture
//     const greeting = "Hello from FunctionA"
//     console.log("Hello from FunctionA")

//     functionB('Ola')
//     console.log('Execution is almost finished')
//     const lastMessage = 'Bye Bye'
//     functionE()
//     console.log(lastMessage)
//   }

//   function functionB(greeting) {
//     const name = 'Filip'
//     console.log(greeting + " Filip")
//     functionC();
//     console.log('Done done done')
//   }

//   function functionC() {
//     console.log('Not Much to do :(')
//     const hmm = functionD(7 + 7)
//     throw Error()
//     console.log(hmm)
//   }

//   function functionD(sum) {
//     const times2 = sum * 2
//     console.log(times2)
//     return times2
//   }

//   function functionE() {
//     console.log('Annoying Here')
//   }

//   debugger
//   functionA()
// }

export default function () {
  const person = {
    firstName: "Filip",
    lastName: "Jerga",
    age: 28,
    printUserInfo() {
      console.log(
        `Hello ${this.firstName} ${this.lastName} of age: ${this.age}`
      );
    },
    printSomething(callback) {
      callback();
    },
    helpers: {
      helperVar: "testin variable",
      helperFunc: function () {
        console.log(this.helperVar);
      },
    },
  };

  class Person {
    firstName = "";
    lastName = "";
    age;

    helpers = {
      helperVar: "testin variable",
      helperFunc: function () {
        console.log(this.helperVar);
      },
    };

    constructor(firstName, lastName, age = 0) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
    }

    // constructor(personData) {
    //   const { firstName, lastName, age = 100 } = personData

    //   this.firstName = firstName
    //   this.lastName = lastName
    //   this.age = age
    // }

    printUserInfo() {
      console.log(
        `Hello ${this.firstName} ${this.lastName} of age: ${this.age}`
      );
    }

    printSomething(callback) {
      callback();
    }

    persist(database) {
      database.save(() => ({
        userName: `${this.firstName} ${this.lastName}`,
        age: this.age,
      }));
    }
  }

  class Doctor extends Person {
    hospital = "";
    school = "";

    // constructor({school, hospital, ...rest}) {
    //   super(rest)

    //   this.hospital = hospital
    //   this.school = school
    // }

    constructor(firstName, lastName, age, school, hospital) {
      super(firstName, lastName, age);

      this.hospital = hospital;
      this.school = school;
    }

    printUserInfo() {
      super.printUserInfo();
      alert("I AM CALLING printUserInfo FROM DOCTOR");
    }
  }

  class Database {
    items = [];

    save(getDataCallback) {
      const data = getDataCallback();
      this.items.push(data);
    }
  }

  // Normal vs Arrow
  // function displayGreeting(greeting) {
  //   return `${greeting} Filip`
  // }

  // const displayGreeting2 = greeting => `${greeting} Filip`

  // console.log(displayGreeting('Hello'))
  // console.log(displayGreeting2('Hola'))

  const db = new Database();

  // const doctor = new Doctor({
  //   firstName: 'Filip',
  //   lastName: 'Jerga',
  //   age: 50,
  //   hospital: 'Testing Hospital',
  //   school: 'Testing school'
  // })

  // Person.prototype.myProtoFunction = function() {
  //   console.log('I AM PROTO!!!!!!!!')
  // }

  // Object.prototype.myObjectProto = function() {
  //   console.log('I AM myObjectProto!!!!!!!!')
  // }

  const doctor = new Doctor(
    "Filip",
    "Jerga",
    50,
    "Testing school",
    "Testing Hospital"
  );
  // doctor.printUserInfo()
  // doctor.persist(db)
  const person1 = new Person({ firstName: "Filip", lastName: "Jerga" });
  // person1.printUserInfo()

  // Every instance created using new Person() has a __proto__ property
  // which points to the Person.prototype.

  // This is the chain that is used to traverse to find a property of a
  //  particular object.

  // __proto__ is the actual object that is used in the lookup chain to
  // resolve methods, etc.  prototype is the object that is used to build
  // __proto__ when you create an object with new:

  // const person2 = new Person({age: 34, firstName: 'Peter', lastName: 'Green'})
  // person2.printUserInfo()

  // person1.persist(db)
  // person2.persist(db)

  // console.log(db.items)

  // && - AND
  // || - OR

  // if (2 > 5 && 1 < 10) {
  //   console.log('Welcome in if')
  // } else {
  //   console.log('Welcome in else')
  // }

  // debugger

  // if (true) {
  //   console.log('True or false?')
  // } else {
  //   console.log('True or false?')
  // }

  // if (true && false) {
  //   console.log('True or false?')
  // } else {
  //   console.log('True or false?')
  // }

  // if (false || true) {
  //   console.log('True or false?')
  // } else {
  //   console.log('True or false?')
  // }

  // if (5 > 7) {
  //   console.log('True or false?')
  // }

  // const results = 5 < 7 && 4 > 2
  // if (5 < 7 && 4 > 2) {
  //   console.log('True or false?')
  // }

  // if (5 < 7) {
  //   console.log('True or false?')
  // }

  // const results2 = 5 < 7 || 7 < 1
  // if (5 < 7 || 7 < 1) {
  //   console.log('True or false?')
  // }

  // if (5 >= 5) {
  //   console.log('True or false?')
  // }

  // if (3 <= 5) {
  //   console.log('True or false?')
  // }

  // if (2 * 3 == 6) {
  //   console.log('True or false?')
  // }

  // if (doctor.school === 'Harvard' || doctor.age > 45) {
  //   console.log('True or false?')
  // }

  // doctor.school === 'Harvard' && doctor.age > 30 && alert('Hello World')

  // if (5 > 7) {
  //   console.log('I am called. Hurray!!!!!!')

  // } else if (4 < 2) {
  //   console.log('Welcome in else if block')
  // }
  // else {
  //   console.log('I am called too. Welcome in else block!!')
  // }

  const dog = {
    breed: "German Shepard",
    age: 5,
    children: 3,
    isAfterInjury: true,
    vacination: {
      vacination1: true,
      vacination2: false,
    },
    testFunction1: () => "Test Value 1",
    testFunction2: () => "Test Value 2",
  };

  // const name = "Filip"
  // name = "John"

  // let name = "Filip"
  // name = "John"

  // var name = "Filip"
  // let name1 = "Emma"

  // var name = "John"
  // let name1 = "Victor"

  // console.log(a)
  // console.log(b)
  // if (dog.age > 3) {
  //   var a = "something"
  //   let b = "anything"
  // }

  // console.log(a)
  // console.log(b)

  // const someVar = dog.age > 6 ? dog.testFunction1() :  dog.testFunction2()

  // dog.age > 3 && dog.isAfterInjury && dog.testFunction1()

  // if (dog.age > 3 && dog.isAfterInjury) {
  //   dog.testFunction1()
  // }

  // const { breed, isAfterInjury } = dog

  // const {breed} = dog
  // const {isAfterInjury} = dog

  // if (dog.breed === 'German Shepard' && dog.age > 3) {
  //   console.log('Waf Waf!')
  // } else {
  //   console.log('Dog is sad :(')
  // }

  // if (dog.children <= 3 && dog.isAfterInjury === false) {
  //   console.log('Waf Waf!')
  // } else {
  //   console.log('Dog is sad :(')
  // }

  //   if (dog.vacination.vacination1) {
  //   console.log('Waf Waf!')
  // } else {
  //   console.log('Dog is sad :(')
  // }

  // if ((dog.children > 2 || dog.vacination.vacination1 === true) && dog.vacination.vacination2 === true) {
  //   console.log('Waf Waf!')
  // } else {
  //   console.log('Dog is sad :(')
  // }

  // // Tricky one! Why is "!" in front of expresion ?
  // if (!dog.isAfterInjury) {
  //   console.log('Waf Waf!')
  // } else {
  //   console.log('Dog is sad :(')
  // }

  // // Strict operators
  // if ( 2 == "2") {
  //   console.log('Whaaaat ?')
  // } else {
  //   console.log('Hmmmmm :(')
  // }

  // if ( 2 === "2") {
  //   console.log('Whaaaat ?')
  // } else {
  //   console.log('Hmmmmm :(')
  // }

  // if ( 1 === true) {
  //   console.log('Whaaaat ?')
  // } else {
  //   console.log('Hmmmmm :(')
  // }

  // if ( 1 == true) {
  //   console.log('Whaaaat ?')
  // } else {
  //   console.log('Hmmmmm :(')
  // }

  // if ( 0 === false) {
  //   console.log('Whaaaat ?')
  // } else {
  //   console.log('Hmmmmm :(')
  // }

  //  if ( 0 == false) {
  //   console.log('Whaaaat ?')
  // } else {
  //   console.log('Hmmmmm :(')
  // }

  const personList = [
    { firstName: "Filip", lastName: "Jerga" },
    { firstName: "John", lastName: "Snow" },
    { firstName: "Filip", lastName: "Smith" },
    { firstName: "Emma", lastName: "Green" },
  ];

  // for (let i = 0; i < personList.length; i++) {
  //   console.log(personList[i].firstName)
  // }

  // personList.forEach(person => console.log(person.firstName))

  // map
  // filter

  // const personNamesList = personList.map(function(person) {
  //   return person.firstName
  // })

  // const personNamesList = personList.map(person => person.firstName)

  // const filteredNames = personList.filter(function(person) {
  //   return person.firstName === 'Filip'
  // })

  // const filteredNames = personList.filter(person => person.firstName === 'Filip')

  // Array.prototype.forEach2 = function(callback) {
  //   for (let i = 0; i < this.length; i++) {
  //     callback(this[i], i)
  //   }
  // }

  // personList.forEach2(function(person, index) {
  //   console.log(index)
  //   console.log(person.firstName)
  // })

  // Array.prototype.map2 = function(callback) {
  //   let newArray = []
  //   for (let i = 0; i < this.length; i++) {
  //     let transformedValue = callback(this[i], i)
  //     newArray.push(transformedValue)
  //   }

  //   return newArray
  // }

  // const personNamesList = personList.map2(function(person) {
  //   return person.firstName
  // })

  // Array.prototype.filter2 = function(callback) {
  //   let newArray = []

  //   for (let i = 0; i < this.length; i++) {
  //     let canAddToArray = callback(this[i], i)

  //     if (canAddToArray) {
  //       newArray.push(this[i])
  //     }
  //   }

  //   return newArray
  // }

  // const filteredNames = personList.filter2(function(person) {
  //   return person.firstName === 'Filip'
  // })

  // debugger

  // const globalScope = "globalScope"
  // function a() {
  //   const aScope = "sScope"
  //   console.log(aScope)
  //   console.log(globalScope)

  //   function b() {
  //     const bScope = "bSCope"
  //     console.log(aScope)
  //     console.log(globalScope)

  //     if (2 > 1) {
  //       debugger
  //       const ifScope = "ifScope"
  //       console.log(bScope)
  //       console.log(ifScope)
  //     }

  //     console.log(ifScope)
  //   }

  //   if (5 > 3) {
  //     const ifScope= "ifScope"
  //     console.log(aScope)
  //     // console.log(bScope)
  //     console.log(globalScope)
  //   }

  //   // console.log(bScope)
  //   // console.log(ifScope)

  //   b()
  // }
  // a()
}

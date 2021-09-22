
// Create function "transformYearsToDays"
// Specify function argument of "years"
// Multiply years by 365 and return it from the function
// in "main" function call "transformYearsToDays" and pass userAge to the function
// Print function result on the screen

void main() {
  Person person1 = new Person();
  person1.age = 28;
  person1.name = 'Filip Jerga';
  person1.height = 187.5;
  person1.employeeStatus = true;

  Person person2 = new Person();
  person2.age = 28;
  person2.name = 'Filip Jerga2';
  person2.height = 187.5;
  person2.employeeStatus = true;

  displayUserInfo(age: person1.age, name: person1.name, height: person1.height, employeeState: person1.employeeStatus);

  displayUserInfo(age: person2.age, name: person2.name, height: person2.height, employeeState: person2.employeeStatus);

//   var userAgeInDays = transformYearsToDays(userAge);
}

class Person {
  String name;
  int age;
  double height;
  bool employeeStatus;
}

int transformYearsToDays(int years) {
  return years * 365;
}


String displayUserInfo({
  String name = 'Default User',
  int age,
  double height,
  bool employeeState
}) {
  print(name);
  print(age);
  print(height);
  print(employeeState);

  return 'I have been returned!';
}












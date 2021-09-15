
// Create function "transformYearsToDays"
// Specify function argument of "years"
// Multiply years by 365 and return it from the function
// in "main" function call "transformYearsToDays" and pass userAge to the function
// Print function result on the screen

void main() {
//   Person person1 = new Person(name: 'Filip Jerga', age: 28, height: 187.5, employeeStatus: true);
//   Person person2 = new Person(name: 'John Smith', age: 35, height: 177.8, employeeStatus: false);
  Person person1 = new Person('Filip Jerga', 28, 187.5, true);
  Person person2 = new Person('John Smith', 35, 177.8, false);


  displayUserInfo(age: person1.age, name: person1.name, height: person1.height, employeeState: person1.employeeStatus);

  displayUserInfo(age: person2.age, name: person2.name, height: person2.height, employeeState: person2.employeeStatus);

//   var userAgeInDays = transformYearsToDays(userAge);
}

class Person {
  String name;
  int age;
  double height;
  bool employeeStatus;

  Person(String name,int age, double height, bool employeeStatus) :       this.name = name,
    this.age = age,
    this.height = height,
    this.employeeStatus = employeeStatus {
      print('Calling constructor from $this');
    }

//   Person({
//     String name,
//     int age,
//    double height,
//    bool employeeStatus
//   }) {
//     this.name = name;
//     this.age = age;
//     this.height = height;
//     this.employeeStatus = employeeStatus;
//   }

//   Person(this.name, this.age, this.height, this.employeeStatus);

//   Person(String name,int age, double height, bool employeeStatus) {
//     this.name = name;
//     this.age = age;
//     this.height = height;
//     this.employeeStatus = employeeStatus;
//   }

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













// Create function "transformYearsToDays"
// Specify function argument of "years"
// Multiply years by 365 and return it from the function
// in "main" function call "transformYearsToDays" and pass userAge to the function
// Print function result on the screen

void main() {
  final String userName = 'Filip Jerga';
  int userAge = 28;
  double userHeight = 186.5;
  bool userEmployeeStatus = true;

  Person person1 = new Person();

  print(person1);

  displayUserInfo(age: userAge, name: userName, height: userHeight, employeeState: userEmployeeStatus);

  var userAgeInDays = transformYearsToDays(userAge);
}

class Person {
  String userName;
  int userAge;
  double userHeight;
  bool userEmployeeStatus;
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













// Filip
// 28
// 186.5
// true

void main() {
  final String userName = 'Filip Jerga';
  int userAge = 28;
  double userHeight = 186.5;
  bool userEmployeeStatus = true;

  displayUserInfo(age: userAge, name: userName, height: userHeight, employeeState: userEmployeeStatus);

  displayUserInfo(age: 5, name: 'Test user');
}


void displayUserInfo({
  String name = 'Default User',
  int age,
  double height,
  bool employeeState
}) {
  print(name);
  print(age);
  print(height);
  print(employeeState);
}












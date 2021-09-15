
void main() {
  Person person1 = new Person('Filip Jerga', 28, 187.5, true);
  Person person2 = new Person.named(name: 'John Smith', age: 35, height: 177.8, employeeStatus:  false);

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
      print('Calling default constructor from $this');
   }

  Person.named({
    String name,
    int age,
    double height,
    bool employeeStatus
  }) {
    this.name = name;
    this.age = age;
    this.height = height;
    this.employeeStatus = employeeStatus;
    print('Calling named constructor from $this');
  }


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












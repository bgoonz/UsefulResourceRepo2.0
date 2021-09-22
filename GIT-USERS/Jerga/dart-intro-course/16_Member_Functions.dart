
void main() {
  Person person1 = new Person('Filip Jerga', 28, 187.5, true);
  Person person2 = new Person.named(name: 'John Smith', age: 35, height: 177.8, employeeStatus:  false);

  person1.displayUserInfo();
  person2.displayUserInfo();

  var userAgeInDays = person1.getAgeInDays();
  print(userAgeInDays);
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

  int getAgeInDays() {
    return age * 365;
  }


  String displayUserInfo() {
    print(name);
    print(age);
    print(height);
    print(employeeStatus);

    return 'I have been returned!';
  }
}














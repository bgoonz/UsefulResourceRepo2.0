// 1, Create class "Car"
// 2. Specify String "brand", String "model", int "year" intance variables of "Car"
// 3. Create defaut constructor where you will fill your instance variables with values: "Default Brand", "Default Model", "0"
// 4. Create named constructor with named arguments
// 5. Create Function with name "honk", inside of function print "Brand is honking"
// 6. Create function to transform year of car to minutes and return this value from function
// 7. in main function create 2 instances of Car. One with default and other one with named constructor
// 8. call "honk" function on both instances of car
// 9. call "transformYearToMinutes" on both instances and display this data in print


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
//     print(name);
//     print(age);
//     print(height);
//     print(employeeStatus);

    print('$name, $age, $height, $employeeStatus');

    return 'I have been returned!';
  }
}














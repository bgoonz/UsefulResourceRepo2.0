import 'repository.dart';
import './models/hospital_person.dart';
import './models/patient.dart';
import './models/doctor.dart';
import './models/person.dart';
import 'dart:io';

void main() async {
  print(Patient.numberOfPatientInstances);
  final repository = initRepository();
  print(Patient.numberOfPatientInstances);

  Patient.getNumberOfInstance();

  bool appIsRunning = true;
  displayWelcomeText();
  while(appIsRunning) {
    print('Write an option:');
    final input = stdin.readLineSync().toLowerCase();

    switch(input) {
      case '1':
        displayDBUsers(repository);
        break;
      case 'help':
        displayAvailableOptions();
        break;
      case 'quit':
        appIsRunning = false;
        break;
      case 'exit':
        appIsRunning = false;
        break;
      default:
        print('No supported option!');
    }
  }
}

Future<String> fetchSomeData() {
  return Future.delayed(Duration(milliseconds: 3000), (){
    print('3 Seconds Later!');
    return 'Future resolved!';
  });
}



void displayDBUsers(Repository r) {
  final persons = r.items;
  persons.forEach((k, p) => p.displayUserInfo());
}

void displayWelcomeText() {
  print('Hello, Welcome in Hospital DB APP');
  print('---------------------------------');
  displayAvailableOptions();
}

void displayAvailableOptions() {
  print('Please choose following options:');
  print('1 - List all of the persons in Hospital');
  print('Help - Display available options');
  print('Type Exit or Quit to exit application');
}



Repository<Person> initRepository() {
  List<String> person1Allergies = ['peanuts', 'wheat', 'apples'];
  List<String> person2Allergies = ['dust', 'oranges', 'cats'];

  Patient person1 = Patient('Filip Jerga', 28, 187.5, false, person1Allergies);
  Patient person2
    = Patient.named(name: 'John Smith',
                   age: 35,
                   height: 177.8,
                   employeeStatus:  false,
                   allergies: person2Allergies);
  Doctor doctor = Doctor.named(name: 'Dr. Jake',
                               age: 44,
                               height: 187.0,
                               employeeStatus: true,
                               sector: 'cardiology');
  doctor..addPatient(person1)
        ..addPatient(person2);

  Repository<Person> repository = Repository<Person>();

  repository..addItem(person1)
            ..addItem(person2)
            ..addItem(HospitalPerson('Tom Hill', 34, 197.5, true))
            ..addItem(doctor);

  return repository;
}





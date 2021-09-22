import 'hospital_person.dart';
import 'patient.dart';

class Doctor extends HospitalPerson {
  String _sector;
  List<Patient> _patients;

  Doctor(String name,
         int age,
         double height,
         bool employeeStatus,
         String sector,
         List<Patient> patients)
    : _sector = sector,
      _patients = patients ?? [],
      super(name, age, height, employeeStatus);

  Doctor.named({String name,
                int age,
                double height,
                bool employeeStatus,
                String sector,
                List<Patient> patients})
              : _sector = sector,
                _patients = patients ?? [],
                super(name, age, height, employeeStatus);

  void addPatient(Patient patient) {
    _patients.add(patient);
  }

  void showPatients() {
    _patients.forEach((p) => p.displayUserInfo());
  }

  @override
  String displayUserInfo() {
    print('$name, $age, $height, $employeeStatus, $_sector');
    return 'I have been returned!';
  }

}

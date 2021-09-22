const Employee = require('./employee.js');

class Manager extends Employee {
  constructor(name, title, salary, boss, employeeList) {
    super(name, title, salary, boss);
    this.employeeList = employeeList;
  }
  totalSubSalary() {
    let totalSubSalaries = this.salary;
    let currentEmployee = this.employeeList;
    for (let i = 0; i < currentEmployee.length; i++) {
      totalSubSalaries += currentEmployee[i].salary;
    }
    return totalSubSalaries;
  }

  bonus(multiplier) {
    return this.totalSubSalary() * multiplier;
  }

}



const hobbes = new Manager('Hobbes', "Founder", 1000000, null, [] )
const calvin = new Manager('Calvin','Director',130000, hobbes, [])
const susie = new Manager('Susie', "TA Manager", 100000, calvin, [])
const lily = new Employee('Lily','TA', 90000, susie)
const clifford = new Employee('Clifford', 'TA' , 90000, susie)

console.log(hobbes.bonus(0.05)); // 50000 // 70500
console.log(calvin.bonus(0.05)); // 6500 // 20500
console.log(susie.bonus(0.05)); // 14000
console.log(lily.bonus(0.05)); // 4500
console.log(clifford.bonus(0.05)); // 4500

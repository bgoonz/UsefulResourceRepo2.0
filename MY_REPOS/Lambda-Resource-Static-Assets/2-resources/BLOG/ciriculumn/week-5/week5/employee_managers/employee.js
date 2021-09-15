class Employee {
  constructor (name, title, salary, boss) {
    this.name = name;
    this.title = title;
    this.salary = salary;
    this.boss = boss;
    if(boss) boss.employeeList.push(this)
  }

  bonus(multiplier) {
    return this.salary * multiplier;
  }
}

module.exports= Employee;

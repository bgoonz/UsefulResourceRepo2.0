---
id: generics
title: Generics
---

Generics allow for designing a classes and methods whose types are specified only at the time of declaration and instantiation.

Without generics we will have to create class for every datatype. We can use object but it will involve boxing and unboxing. With generics, there is no need for that.

## Advantages of Generics

1. Casting is not necessary
2. Generics makes code type safe
3. Code is not duplicated for multiple types of data

```c#
using System;
using System.Collections;
using System.Collections.Generic;

public class Employee {
    public string Name {get; set;}
    public int EmployeeId {get;set;}
}

public class EmployeeList {
    public List<Employee> employeeList = new List<Employee>();
    public void addEmployee(Employee employee){
        this.employeeList.Add(employee);
    }
    public void print(){
		foreach (Employee item in employeeList) {
			Console.WriteLine(item.Name);
		}
    }
}

public class Program {
    public static void Main(string[] args){
        Employee emp1 = new Employee();
        emp1.Name = "Ashish Patel";
        emp1.EmployeeId = 189;
		Employee emp2 = new Employee();
        emp2.Name = "Ansu Patel";
        emp2.EmployeeId = 182;
        EmployeeList empList = new EmployeeList();
        empList.addEmployee(emp1);
		empList.addEmployee(emp2);
        empList.display();
    }
}
```

With generics we can simply write the above code as below

```c#
using System;
using System.Collections;
using System.Collections.Generic;

public class Employee {
    public string Name {get; set;}
    public int EmployeeId {get;set;}
}

public class EmployeeList<T> {
    public List<T> employeeList = new List<T>();
    public void addEmployee(T employee){
        this.employeeList.Add(employee);
    }
    public void display(){
		foreach (T item in employeeList) {
			Console.WriteLine(item.dump());
		}
    }
}

public class Program {
    public static void Main(string[] args){
        Employee emp1 = new Employee();
        emp1.Name = "Ashish Patel";
        emp1.EmployeeId = 189;
		Employee emp2 = new Employee();
        emp2.Name = "Ansu Patel";
        emp2.EmployeeId = 182;
        EmployeeList<Employee> empList = new EmployeeList<Employee>();
        empList.addEmployee(emp1);
		empList.addEmployee(emp2);
        empList.display();
    }
}
```

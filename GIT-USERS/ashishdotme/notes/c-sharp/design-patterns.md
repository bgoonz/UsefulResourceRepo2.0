---
id: design-patterns
title: Design Patterns
---

Design patterns may be said as a set of probable solutions for a particular problem which is tested to work best in certain situations.

## Creational Patterns

These patterns deals mainly with creation of objects and classes.

### Factory Method

Factory method design pattern abstract the process of object creation and allows the object to be created at run-time when it is required.

```C#
using System;

namespace FactoryPatternDemo
{
    // 'IProduct' Interface
    interface IFactory {
        void details();
    }

    // 'ConcreteProduct' class
    class PermanentEmployee : IFactory
    {
        public void details()
        {
            Console.WriteLine("This is permanent employee type object");
        }
    }
    // 'ConcreteProduct' class
    class TemporaryEmployee : IFactory
    {
        public void details()
        {
            Console.WriteLine("This is Temporary employee type object");
        }
    }
    // 'Creator' abstract class
    abstract class EmployeeFactory
    {
        public abstract IFactory Factory(string employeeType);
    }
    // 'ConcrteCreator' class
    class ConcreteEmployeeFactory : EmployeeFactory
    {
        public override IFactory Factory(string employeeType)
        {
            switch (employeeType)
            {
                case "PermanentEmployee":
                    return new PermanentEmployee();
                case "TemporaryEmployee":
                    return new TemporaryEmployee();
                default:
                    throw new ApplicationException(string.Format("This type of employee can not be created"));
            }
        }
    }

    // factory method design pattern demo
    // calling class/ client
    class Program
    {
        static void Main(string[] args)
        {
            EmployeeFactory EmployeeFactory = new ConcreteEmployeeFactory();

            IFactory permanentEmployee = EmployeeFactory.Factory("PermanentEmployee");
            permanentEmployee.details();

            IFactory TemporaryEmployee = EmployeeFactory.Factory("TemporaryEmployee");
            TemporaryEmployee.details();

            Console.ReadLine();
        }
    }
}
```

### Singleton Method

## Structural Patterns

These patterns deals with Class and Object Composition.

## Behavioural Patterns

These mainly deals with Class - Object communication.

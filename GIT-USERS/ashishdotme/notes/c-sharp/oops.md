---
id: oops
title: OOPS
---

## Class

Class is the blueprint of the object as it stores data and functions. It does not occupy space as it is just the logical representation of data.

## Object

Object is instance of class. When an object is created using new operator, memory is allocated for the class in the heap.

## Abstraction

Astraction is to represent the essential feature without representing the background details. It lets you focus on what object does instead of how it does it. It is nothing but putting all the variables and methods in a class that are necessary.

```c#
abstract class Human {
	public void walking();
	public void talking();
}

public class Male: Human{
	public void Fighting();
}

public class Female: Human{
	public void dancing();
}
```

## Encapsulation

Encapsulation is a technique used to protect the information in an object from another object.
For example we can hide the data for security by making variable private and we expose the variable by making it public.

## Inheritance

Inheritance is when a class includes property of another class.

## Polymorphism

Polymorphism means when a function behaves in different forms depending upon the parameters.

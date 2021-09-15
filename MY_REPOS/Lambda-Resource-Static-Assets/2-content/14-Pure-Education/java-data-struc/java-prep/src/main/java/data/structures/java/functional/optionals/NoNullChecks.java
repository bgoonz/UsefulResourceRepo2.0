package data.structures.java.functional.optionals;

import java.util.Optional;

public class NoNullChecks
{
  /*
  Consider a person who might have a car which might be insured
  Some person may not have a car
  Some person may have a car which is not insured
  In a typical application this would require a lot of null checks
   */

  static class Insurance
  {
    private String name;

    public Insurance(String name)
    {
      this.name = name;
    }

    public String getName()
    {
      return name;
    }
  }

  static class Car
  {
    private Optional<Insurance> insurance;

    public Car(Optional<Insurance> insurance)
    {
      this.insurance = insurance;
    }

    public Optional<Insurance> getInsurance()
    {
      return insurance;
    }
  }

  static class Person
  {
    private Optional<Car> car;

    public Person(Optional<Car> car)
    {
      this.car = car;
    }


    public Optional<Car> getCar()
    {
      return car;
    }
  }

  public static Insurance findCheapestInsurance(Person person, Car car)
  {
    return new Insurance("cheapest");
  }

  public static String  getInsuranceName(Optional<Person> person)
  {
    return person.flatMap(Person::getCar).flatMap(Car::getInsurance).map(Insurance::getName).orElse("Unknown");
  }

  public static Optional<Insurance> cheapestInsuranceSameAsNullCheck(Optional<Person> person, Optional<Car> car)
  {
    if(person.isPresent() && car.isPresent())
    {
      return Optional.of(findCheapestInsurance(person.get(), car.get()));
    }
    else
    {
      return Optional.empty();
    }
  }

  public static Optional<Insurance> cheapestInsuranceNoNullCheck(Optional<Person> person, Optional<Car> car)
  {
    return person.flatMap(p -> car.map(c -> findCheapestInsurance(p, c)));
  }

  public static void main(String[] args)
  {
    Insurance insurance = new Insurance("Geico");
    Car car = new Car(Optional.of(insurance));
    Person p = new Person(Optional.of(car));

    Optional<Insurance> cheapestInsurance = cheapestInsuranceNoNullCheck(Optional.of(p), Optional.of(car));
    System.out.println("Insurance : " + cheapestInsurance.get().name);
  }

}

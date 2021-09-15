package problems.java.functional;

import java.util.Optional;

public class Optionals
{
    /*
    Consider a person who might have a car which might be insured
    Some person may not have a car
    Some person may have a car which is not insured
    In a typical application this would require a lot of null checks
    */

    static class Insurance
    {
        String insuranceName;
        Insurance(String name)
        {
            this.insuranceName = name;
        }

        String getInsuranceName()
        {
            return insuranceName;
        }
    }

    static class Car
    {
        Optional<Insurance> insuranceOptional;
        Car(Optional<Insurance> insuranceOptional)
        {
            this.insuranceOptional = insuranceOptional;
        }

        Optional<Insurance> getInsuranceOptional()
        {
            return insuranceOptional;
        }
    }

    static class Person
    {
        Optional<Car> carOptional;
        Person(Optional<Car> carOptional)
        {
            this.carOptional = carOptional;
        }

        Optional<Car> getCarOptional()
        {
            return carOptional;
        }
    }

    static String getInsuranceNameNoNullChecks(Optional<Person> personOptional)
    {
        return null;
    }

    static String getInsuranceNameSameAsNullChecks(Optional<Person> personOptional)
    {
        return null;
    }

    static boolean testsPass()
    {
        Insurance insurance1 = new Insurance("Geico");
        Car car1 = new Car(Optional.of(insurance1));
        Person person1 = new Person(Optional.of(car1));
        String insuranceName = getInsuranceNameNoNullChecks(Optional.of(person1));
        boolean check = insuranceName.equals("Geico");
        if(!check)
        {
            return false;
        }
        insuranceName = getInsuranceNameSameAsNullChecks(Optional.of(person1));
        check = insuranceName.equals("Geico");
        if(!check)
        {
            return false;
        }
        Car car2 = new Car(Optional.empty());
        Person person2 = new Person(Optional.of(car2));
        insuranceName = getInsuranceNameNoNullChecks(Optional.of(person2));
        check = insuranceName.equals("Unknown");
        if(!check)
        {
            return false;
        }
        return true;
    }

    public static void main(String... args)
    {
        if(testsPass())
        {
            System.out.println("Tests passed");
        }
        else
        {
            System.out.println("Tests failed");
        }
    }

}

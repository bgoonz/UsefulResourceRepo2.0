/**
 * Created by ahadsheriff on 6/2/16.
 */
public class Person {
    String name;

    public Person(String personName) {
        name = personName;
    }

    public String greet(String yourName) {
        return String.format("Hi %s, my name is %s",name, yourName);
    }
}
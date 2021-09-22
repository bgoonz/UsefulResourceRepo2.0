/**
 * Created by Ashish Patel
 * Copyright © 2017 ashish.me
 * ashishsushilpatel@gmail.com 
 */

/**
 * Return a full name of the country from the three letter country code
 * If the input is greater than 3 letters, consider it as the name of a country, and return the three-letter code for it. 
 * Write a helpful error message if the input is neither a valid code nor a country name
 */

import java.util.*;

class CountryCode {
  public static void main(String[] args) {

    // Setup countries name hashmap
    HashMap<String, String> countries = new HashMap<String, String>();
    countries.put("IND", "India");
    countries.put("IDN", "Indonesia");
    countries.put("GBR", "United Kingdom");

    // Ask user input 
    System.out.print("Enter the Country Code or Country Name--> ");
    try (Scanner scanner = new Scanner(System.in)) {
      String country = scanner.nextLine();
      if (country.length() > 3 && countries.containsValue(country)) {
        System.out.println(getCountryCode(countries, country));
      } else if (countries.containsKey(country)) {
        System.out.println(getCountryName(countries, country));
      } else {
        System.out.println("Country not found");
      }
    }
  }

  public static String getCountryCode(HashMap<String, String> countries, String name) {
    for (Map.Entry<String, String> entry : countries.entrySet()) {
      if (entry.getValue().equals(name)) {
        return entry.getKey();
      }
    }
    return "Country not found";
  }

  public static String getCountryName(HashMap<String, String> countries, String code) {
    return countries.get(code);
  }
}

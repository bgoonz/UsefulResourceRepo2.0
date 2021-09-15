package carportal;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Address{
	@Column(name = "street_name")
	private String streetName;

	@Column(name = "street_number")
	private String streetNumber;

	@Column(name = "zip_code")
	private String zipCode;

	private String city;
	
	Address(){}
	
	public Address(String streetName, String streetNumber, String zipCode, String city){
		this.streetName = streetName;
		this.streetNumber = streetNumber;
		this.zipCode = zipCode;
		this.city = city;
	}
	
	public String getStreetName(){
		return streetName;
	}
	
	public String getStreetNumber(){
		return streetNumber;
	}
	
	public String getZipCode(){
		return zipCode;
	}
	
	public String getCity(){
		return city;
	}
}

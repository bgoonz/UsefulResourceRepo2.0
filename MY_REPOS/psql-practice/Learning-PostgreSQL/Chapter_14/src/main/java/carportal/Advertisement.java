package carportal;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "advertisement")
public class Advertisement{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "advertisement_id")
	private int advertisementID;
	
	@Column(name = "advertisement_date")
	private Date advertisementDate;
	
	@Column(name = "car_id")
	int carID;

	@Column(name = "seller_acount_id")
	int sellerAccountID;
	
	@ManyToMany(cascade = CascadeType.ALL)
   @JoinTable(name="favorite_ads", 
               joinColumns={@JoinColumn(name="advertisement_id")}, 
               inverseJoinColumns={@JoinColumn(name="account_id")})
   private Set<Account> accounts = new HashSet<>();

	Advertisement(){}
	
	public Advertisement(Date advertisementDate, int carID, int sellerAccountID){
		super();
		this.advertisementDate = advertisementDate;
		this.carID = carID;
		this.sellerAccountID = sellerAccountID;
	}
	
}

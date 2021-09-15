package carportal;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.Session;

@Entity
@Table(name = "account")
@NamedQuery(name = "Account.byLastName", query = "from Account where lastName = :lastName")
public class Account{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "account_id")
	@Basic(fetch = FetchType.EAGER)
	private int accountID;

	@Column(name = "first_name")
	@Basic(fetch = FetchType.EAGER)
	private String firstName;

	@Column(name = "last_name")
	@Basic(fetch = FetchType.EAGER)
	private String lastName;

	@Basic(fetch = FetchType.EAGER)
	private String email;

	@Column
	@Basic(fetch = FetchType.EAGER)
	private String password;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "account")
	private Set<AccountHistory> accountHistory = new HashSet<>();

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "favorite_ads", joinColumns = {@JoinColumn(name = "account_id")}, inverseJoinColumns = {@JoinColumn(
			name = "advertisement_id")})
	private Set<Advertisement> advertisement = new HashSet<>();

	Account(){}

	public Account(String firstName, String lastName, String email, String password){
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
	}

	public void changePassword(String password){
		Session session = SessionFactoryHelper.getSessionFactory().openSession();
		session.beginTransaction();
		this.password = password;
		session.update(this);
		session.getTransaction().commit();
		session.close();
	}

	public Set<AccountHistory> getHistory(){
		return accountHistory;
	}

	public Set<Advertisement> getAds(){
		return advertisement;
	}
	
	public int getAccountID(){
		return accountID;
	}

	public String getPassword(){
		return password;
	}
}

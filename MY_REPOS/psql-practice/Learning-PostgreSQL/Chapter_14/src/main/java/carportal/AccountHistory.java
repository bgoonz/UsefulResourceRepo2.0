package carportal;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "account_history")
public class AccountHistory{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "account_history_id")
	private int accountHistoryID;

	@Column(name = "search_key")
	private String searchKey;

	@Column(name = "search_date")
	private Date searchDate;

	@ManyToOne()
	@JoinColumn(name = "account_id")
	private Account account;

	AccountHistory(){}

	public AccountHistory(String searchKey, Date searchDate, Account account){
		this.searchKey = searchKey;
		this.searchDate = searchDate;
		this.account = account;
	}

	public int getAccountHistoryID(){
		return accountHistoryID;
	}
	
	public String getSearchKey(){
		return searchKey;
	}
	
	public Date getSearchDate(){
		return searchDate;
	}
	
	public Account getAccount(){
		return account;
	}
}

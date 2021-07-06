const accounts = [];

function createAccount(account) {
	accounts.push(account);	
	return account;
}

function getAccount(username) {
	let match;

	for (i = 0; i < accounts.length; i++) { 
		if (account[i].username === username) {
			match = accounts[i];
		}
	}
	
	return match;
	
}

function deposit(account, amount){
	// Only accept number, use typeOf
	if (typeof amount  === 'number') {
			account.balance += amount;
	}
	else{
		console.log("Invalid amount")
	}
}

function withdraw(account, amount){
	// Only accept number
	if (typeof amount  === 'number') {
			account.balance -= amount;
	}
	else{
		console.log("Invalid amount")
	}
}

function getBalance({balance}) {
	return balance;
}

function createBalanceGetter({balance}) {
	return () => {
		return balance;
	};
}
		
const ahad = createAccount({
	account: 'ahad'
});
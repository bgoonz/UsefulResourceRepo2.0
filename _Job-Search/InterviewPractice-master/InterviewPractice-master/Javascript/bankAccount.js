const account = {
	balance: 0
};

function deposit(account, amount){
	account.balance += amount;
}

function withdraw(account, amount){
	account.balance -= amount;
}

function getBalance({balance}) {
	return balance;
}


deposit(account, 10000);
console.log(getBalance(account));
console.log("After withdraw: ");
withdraw(account, 7900);
console.log(getBalance(account));


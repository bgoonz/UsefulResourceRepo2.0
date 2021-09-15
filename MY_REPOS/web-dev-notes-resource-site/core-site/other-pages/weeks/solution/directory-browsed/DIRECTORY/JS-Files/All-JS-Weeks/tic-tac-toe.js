function TicTacToeWinner (array) {
	let check = [];
	for (let x = 0; x < 3; x++){
		check=check.concat(array[x][0]+array[x][1]+array[x][2]);
		check=check.concat(array[0][x]+array[1][x]+array[2][x]);
	}
	check=check.concat(array[0][0]+array[1][1]+array[2][2]);
	check=check.concat(array[0][2]+array[1][1]+array[2][0]);
	
	if (check.includes("xxx")) {
		console.log("Winner is X");
	}
	else if (check.includes("ooo")) {
		console.log("Winner is O");
	}
	else {
		console.log("There are no winners");
	}
}
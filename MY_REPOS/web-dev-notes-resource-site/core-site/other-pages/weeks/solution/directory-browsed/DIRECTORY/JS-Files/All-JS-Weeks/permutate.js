/*
	Permutations Generator
	
	Create a function that takes a string as input and returns an array of all possible permutations of that string. 
	
	Note: Make sure you don't count identicle permutations twice

	ex. DOG
	
	[DOG, DGO, OGD, ODG, GOD, GDO ]
*/

function permutate(str) {
  str = str.toLowerCase(); // toLowerCase
  firstSplit = str.split(""); //divide each letter up in dog
  for (var i = 0; i < firstSplit.length; i++) {
    //loop through each letter in dog
    console.log(str);
  }
}

permutate("Dog");

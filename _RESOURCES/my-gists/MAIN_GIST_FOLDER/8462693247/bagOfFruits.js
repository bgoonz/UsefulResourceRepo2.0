/* ---------
 * Challenge 
 * ---------

 Our fruit guy has a bag of fruits (array of strings) where some 
 fruits are rotten, he wants to replace all the rotten fruits by 
 good ones. For example, given this array ["apple","rottenBanana","apple"] 
 the replaced array should be ["apple","banana","apple"]. Your task is to 
 implement a method that will take as an argument an array of strings 
 containing fruits and should return an array of strings where all the 
 rotten fruits are replaced by good ones.
*/ 

function removeRotten(bagOfFruits){
  var newBagOfFruits = []; 
  
  if (bagOfFruits == null) {
    return []; 
  }
  
  bagOfFruits.map(function(item) {
    newBagOfFruits.push(item.replace(/rotten/i, '').toLowerCase()); 
  });
  
  return newBagOfFruits; 
}
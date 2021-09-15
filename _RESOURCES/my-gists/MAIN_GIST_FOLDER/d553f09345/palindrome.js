function isPalindrome(string) {
  function reverse() {//reverse 'closes' over the variables & parameters (in this case 'string') available within the scope of the outter function
    return string.split("").reverse().join("");
  }
  return string === reverse();
}
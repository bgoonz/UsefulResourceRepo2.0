// true -> input is valid
// false -> input is NOT valid
const firstLetterUpper = (iText) => {
  // if there is no value in input return true, input is VALID
  if (!iText) {
    return true;
  }

  // if first letter is uppercased return true, input is VALID
  if (iText[0].toUpperCase() === iText[0]) {
    return true;
  }

  // in any other case return false, input is INVALID
  return false;
  // Or just simply return this
  // return iText[0].toUpperCase() === iText[0];
};

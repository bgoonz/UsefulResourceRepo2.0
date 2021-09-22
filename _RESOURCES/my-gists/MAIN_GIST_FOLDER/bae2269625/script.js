"use strict";

document.addEventListener("DOMContentLoaded", filterTable);

function filterTable() {
  const inputFilter = document.getElementById("txtFind"); // get input type of text
  const bodyRow = document
    .getElementById("table")
    .getElementsByTagName("tbody")[0]; // find Body Row Table
  const rowTable = bodyRow.getElementsByTagName("tr"); // get all of the rows
  const lengthRow = rowTable.length; // calculate number of rows
  const lengthCol = document.getElementById("table").getElementsByTagName("th")
    .length; //number of table's column
  let arrStr = []; // create array for save all of value from input
  let saveNumRows = []; // create Array for save Row's number
  const backupArr = []; // get backup the array
  const getNumRows = []; // create array for use one time !
  let lenVal;
  var goFilter;
  let numRowArr;

  for (let i = 0; i < lengthRow; i++) {
    getNumRows[i] = rowTable[i].getElementsByTagName("td")[0].innerHTML; // save all of the Row's number
  }
  backupArr[0] = getNumRows; // get Backup the all of the row

  // when user write and focus out
  inputFilter.addEventListener("keyup", function (e) {
    const val = this.value.toLowerCase().trim();
    arrStr = val.split(" "); //save all of character in array
    lenVal = arrStr.length; // get length of array

    if (val.length == 0) {
      // if length of input value is Zero
      for (var i = 0; i < lengthRow; i++) {
        saveNumRows[i] = rowTable[i].getElementsByTagName("td")[0].innerHTML; // save all of the Row's number
      } //for
    } //if

    for (var i = 0; i < lenVal; i++) {
      goFilter(arrStr[i], lenVal); // send value and length array
    } //for
  }); //inputFilter.addEventList ener

  var goFilter = function goFilter(val, arrInput) {
    for (
      let i = 0, counter = 0, numRowArr = backupArr[arrInput - 1].length;
      i < numRowArr;
      i++
    ) {
      for (let j = 1; j < lengthCol; j++) {
        const colTable = rowTable[parseInt(backupArr[arrInput - 1][i]) - 1]
          .getElementsByTagName("td")
          [j].innerHTML.toLowerCase(); //get table's cell

        if (colTable.includes(val)) {
          saveNumRows[counter] = rowTable[
            parseInt(backupArr[arrInput - 1][i]) - 1
          ].getElementsByTagName("td")[0].innerHTML; // save number of row that is in result

          rowTable[parseInt(saveNumRows[counter]) - 1].setAttribute(
            "class",
            "showRowResult"
          ); // add class to display table-row for show

          //saveNumRows[counter] = backupArr[arrInput-1][i];
          counter++;
          break; // when any result finded , break the row and go to the next row
        } //if
        else {
          rowTable[parseInt(backupArr[arrInput - 1][i]) - 1].setAttribute(
            "class",
            "results"
          ); // add class for hidden table's row that is not in result
        } //else
      } //for
    } //for
    backupArr[arrInput] = saveNumRows; // save number of rows in first Character or sevtence before Space
    saveNumRows = []; // remove element's array for reuse again
  }; //goFilter
} //filterTable

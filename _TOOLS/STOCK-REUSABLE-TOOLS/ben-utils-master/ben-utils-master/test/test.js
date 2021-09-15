var assert = require('./assert')
var data = require('../data/data')
var utils = require('../index.js')
var filter = utils.filter
var map = utils.map
var countIf = utils.countIf
var expectedArrayOfArrays = require('../data/array-of-arrays')
var expectedFormattedDates = require('../data/formatted-dates')

var meaningOfLife = '42'

/*
 * isNumber
 */

function isNumber (thing) {
  return (typeof thing === 'number' )
}

assert(isNumber(meaningOfLife), false, 'meaningOfLife is not a number datatype')

/*
 * isEmail
 */

function isEmail (str) {
  if (str.includes('@') && str.includes('.')) {
    return true
  } else {
    return false
  }
}

assert(isEmail('thedonald@makeamericagreatagain.com'), true, 'isEmail detects an email')
assert(isEmail('3333@'), false, 'isEmail does not give a false positive')
assert(isEmail('johnny.b.good'), false, 'isEmail does not give a false positive')

/*
 * countIf
 */

var isString = function (s) {
  return typeof s === 'string'
}
var mixedArray = [1, '21', null, Date.now(), 5, meaningOfLife, 42]
var expectedNumberCount = 4 // do you know which 4 are numbers?
var expectedStringCount = 2
var numberCount = countIf(isNumber, mixedArray)
var stringCount = countIf(isString, mixedArray)

assert(numberCount, expectedNumberCount, 'countIf can count the numbers in an array')
assert(stringCount, expectedStringCount, 'countIf can count the strings in an array')

/*
 * filter
 */



var emails = filter(isEmail, data)
assert(emails.length, 44, 'filter and isEmail returns the correct number of emails')

/*
 * map
 */



var someNumbers = [2, 4, 6]
var expectedNumbers = [4, 8, 12]
var timesTwo = function (num) {
  return num * 2
}
var actualNumbers = map(timesTwo, someNumbers)
for (var i = 0; i < expectedNumbers.length; i++) {
  assert(expectedNumbers[i], actualNumbers[i], 'number mapped correctly')
}

/*
 * filterStringsWithCommas
 */

function filterStringsWithCommas (str) {
  return str.includes(',')
}

var stringsWithCommas = filter(filterStringsWithCommas, data)
// assert(stringsWithCommas.length, 62, 'filter and filterStringsWithCommas returns the correct number of commas')

/*
 * splitStringByCommas
 */

function splitStringByCommas (str) {
  return str.split(",")
}

var arrayOfArrays = map(splitStringByCommas, stringsWithCommas)

var matchesArrayOfArrays = arrayOfArrays.every(function (arr, i) {
  return arr.every(function (str, j) {
    return str === expectedArrayOfArrays[i][j]
  })
})

assert(matchesArrayOfArrays, true, 'the generated array of array of strings matches the expected array')

const { throwInvalidRange, checkValue, checkAllValues } = require('./utils')
const { numRange } = require('./numRange')
const { charRange } = require('./charRange')


const range = (start, end, options = {}) => {
  if (options.inc === undefined) {
    options.inc = true;
  }

  if (options.step === undefined) {
    options.step = 1;
  }

  if (checkValue(start) && end === undefined || start === end) return [start]; //tested

  if (checkAllValues(start, end, options)) {
    return throwInvalidRange(start, end, options)
  }

  if (Number.isInteger(start) && Number.isInteger(end)) return numRange(start, end, options)

  if (typeof start === 'string' && typeof end === 'string') {
    return charRange(start.toLowerCase(), end.toLowerCase(), options)
  }
};

module.exports = range;

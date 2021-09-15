import uniqueRandomArray from 'unique-random-array';

const commonLastNames = require('./common-last-names.json');

const mainExport = {
    all: commonLastNames,
    random: uniqueRandomArray(commonLastNames)
};

export default mainExport;
module.exports = mainExport; // for CommonJS compatibility

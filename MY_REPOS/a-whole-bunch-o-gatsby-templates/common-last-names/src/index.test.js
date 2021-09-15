import commonLastNames from '.';

describe('common-last-names', () => {
    it('should have a list of all available names', () => {
        expect(isArrayOfStrings(commonLastNames.all)).toBe(true);
    });

    it('should allow me to get a random name from the list', () => {
        expect(isIncludedIn(commonLastNames.all)(commonLastNames.random())).toBe(true);
    });
});

function isArrayOfStrings(array) {
    return array.every(i => typeof i === 'string');
}

function isIncludedIn(array) {
    return item => array.includes(item);
}

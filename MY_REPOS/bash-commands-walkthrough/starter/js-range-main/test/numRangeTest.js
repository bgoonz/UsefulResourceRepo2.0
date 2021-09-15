const chai = require('chai');
const expect = chai.expect;

const range = require('../dist/');

describe('Test numerical range', () => {

    describe('a. With default step value', () => {

        it('should return the correct value for the range(0,10) using the default step value of 1', () => {
            const res = range(0, 10);
            expect(res).to.be.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        })

        it('should return the correct value for the range(10,0) using the default step value of 1', () => {
            const res = range(10, 0);
            expect(res).to.be.deep.equal([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
        })
    })

    describe('b. With user defined step value', () => {

        it('should return the correct value for the range(0,10) using the step value of 2', () => {
            const res = range(0, 10, { step: 2 });
            expect(res).to.be.deep.equal([0, 2, 4, 6, 8, 10])
        })

        it('should return the correct value for the range(0,10) using the step value of 3', () => {
            const res = range(10, 0, { step: 3 });
            expect(res).to.be.deep.equal([10, 7, 4, 1])
        })
    })
})

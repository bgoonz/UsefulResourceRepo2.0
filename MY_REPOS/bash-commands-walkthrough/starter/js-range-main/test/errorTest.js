const chai = require('chai');
const expect = chai.expect;

const range = require('../dist/');

describe('Test error conditions', () => {

    describe('a. should return [start] if end is omitted', () => {

        it('should return the correct value for the invalid range(1)', () => {
            const res = range(1);
            expect(res).to.be.deep.equal([1])
        })
    })

    describe('b. should return [start] if start and end are the same value', () => {

        it('should return the correct value for the invalid range(1,1)', () => {
            const res = range(1, 1);
            expect(res).to.be.deep.equal([1])
        })
    })

    describe('c. should throw a RangeError if start and end are of different types', () => {

        it('should throw an error when invalid range("a", 2) is called', () => {
            expect(() => range('a', 2)).to.throw(RangeError)
        })
    })

    describe('d. should throw a RangeError if step is less than 0', () => {

        it('should throw an error when invalid step is called for range(1,10,-2)', () => {
            expect(() => range(1, 10, { step: -2 })).to.throw(RangeError)
        })
    })

    describe('d. should throw a RangeError if step is 0', () => {

        it('should throw an error when invalid step is called for range(1,10,0)', () => {
            expect(() => range(1, 10, { step: 0 })).to.throw(RangeError)
        })
    })

    describe('e. should throw a RangeError if step is a float', () => {

        it('should throw an error when invalid step is called for range(1,10,0.5)', () => {
            expect(() => range(1, 10, { step: 0.5 })).to.throw(RangeError)
        })
    })

    describe('e. should throw a RangeError if step is a string', () => {

        it('should throw an error when invalid step is called for range(1,10,"a")', () => {
            expect(() => range(1, 10, { step: "a" })).to.throw(RangeError)
        })
    })
})

const chai = require('chai');
const expect = chai.expect;

const range = require('../dist/');

describe('Test char range', () => {

    describe('a. With default step value', () => {

        it('should return the correct value for the range("a", "d") using the defualt step', () => {
            let res = range("a", "d")
            expect(res).to.deep.equal(["a", "b", "c", "d"])
        })

        it('should return the correct value for the range("d", "a") using the defualt step', () => {
            let res = range("d", "a")
            expect(res).to.deep.equal(["d", "c", "b", "a"])
        })
    })

    describe('a. With user defined step value', () => {

        it('should return the correct value for the range("a", "d", 2) using the defualt step', () => {
            let res = range("a", "d", { step: 2 })
            expect(res).to.deep.equal(["a", "c"])
        })

        it('should return the correct value for the range("d", "a", 2) using the defualt step', () => {
            let res = range("d", "a", { step: 2 })
            expect(res).to.deep.equal(["d", "b"])
        })
    })
})

const chai = require('chai');
const mocha = require('mocha');
const textModule = require('../dist');
const MutableRange = require('../dist').MutableTextRange;

chai.should();

describe('Test MutableRange', function () {

    describe('The range should be changed to "ine2\nline3"', () => {
        it('simpe test', () => {
            const buffer = textModule.createBuffer('line1\nline2\nline3');
            const range = new MutableRange(
                [
                    { column: 1, line: 1 },
                    { column: 5, line: 2 },
                ],
                buffer
            );

            const text = range.getText();
            text.should.eq("ine2\nline3")
        });

        it('The Range shoud be changed to "Hey World\n"', () => {
            const buffer = textModule.createBuffer('Hello, Alex\nHello, World\n');
            const range = new MutableRange([{column: 0, line: 0}, {column: 13, line: 2}], buffer);

            range.setText("Hey World\n");

            range.getText().should.equal("Hey World\n");
            buffer.getLine(0).should.equal("Hey World");
        });

        it('The Range should have "Hey World"', () => {
            const buffer = textModule.createBuffer('Hello, Alex\nHello, World\n');
            const range = new MutableRange([{column: 0, line: 0}, {column: 13, line: 0}], buffer);

            range.start = {column: 0, line: 0};
            range.end = {column: 13, line: 2};

            range.setText("Hey World");

            range.getText().should.equal("Hey World");
            buffer.getLine(0).should.equal("Hey World");

            range.end.column.should.equal(9);
            range.end.line.should.equal(0);
        });

        it('The Range should have "Hey Alex"', () => {
            const buffer = textModule.createBuffer('Hello, Alex\nHello, World\n');
            const range = new MutableRange([{column: 0, line: 0}, {column: 13, line: 0}], buffer);

            range.start = {column: 0, line: 0};
            range.end = {column: 6, line: 0};

            range.setText("Hey");

            range.getText().should.equal("Hey");
            buffer.getLine(0).should.equal("Hey Alex");

            range.end.column.should.equal(3);
            range.end.line.should.equal(0);
        });

        it('The Range should have "Hello, Alex"', () => {
            const buffer = textModule.createBuffer('Hello, World\nHello, World\n');
            const range = new MutableRange([{column: 0, line: 0}, {column: 13, line: 0}], buffer);
            range.setText("Hello, Alex");

            range.getText().should.equal("Hello, Alex");
            buffer.getLine(0).should.equal("Hello, Alex");
        });

    });
});

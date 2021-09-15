const chai = require('chai');
const mocha = require('mocha');
const textModule = require('../dist');

chai.should();

describe('Test TextBuffer methods', function () {
    describe('#insertTextAtLine', () => {
        it('Line 0 should have "Hello, Alex"', () => {
            const buffer = textModule.createBuffer('Hello, World\nHello, World\n');
            buffer.insertTextAtLine(0, 'Hello, Alex');

            buffer.getLine(0).should.equal('Hello, Alex');
        });
    });

    describe('#isLineEmpty', () => {
        it('Should return true', () => {
            const buffer = textModule.createBuffer('Hello, World\nHello, World\n');
            buffer.isLineEmpty(2).should.equal(true);
        });
    });

    describe('#removeLine', () => {
        it('Should return "Hello, World"', () => {
            const buffer = textModule.createBuffer('Hello, World\nHello, World');
            buffer.removeLine(0);
            buffer.getText().should.equal('Hello, World');
        });
    });

    describe('#removeLastLine', () => {
        it('Should return "Hello, World"', () => {
            const buffer = textModule.createBuffer('Hello, World\nHello, World');
            buffer.removeFirstLine();
            buffer.getText().should.equal('Hello, World');
        });
    });

    describe('#removeFirstLine', () => {
        it('Should return "Hello, World"', () => {
            const buffer = textModule.createBuffer('Hello, World\nHello, World');
            buffer.removeFirstLine();
            buffer.getText().should.equal('Hello, World');
        });
    });

    describe('#removeLineRange', () => {
        it('Should return "Hello, World"', () => {
            const buffer = textModule.createBuffer('Hello, World\nHello, Everyone\nHello, Again!\n');
            buffer.removeLineRange(1, 3);
            buffer.getText().should.equal('Hello, World');
        });
    });

    describe('#getRangeText', () => {
        it('Should return "Hello, World\n"', () => {
            const buffer = textModule.createBuffer('Hello, World\nHello, Everyone\nHello, Again!\n');
            const range = textModule.createTextRange({column: 0, line: 0}, {column: 12, line: 0});
            const data = buffer.getRangeText(range);
            data.should.equal('Hello, World');
        });
    });

    describe('#replaceRange()', () => {
        it('Should be "areplaced!\nlinefg"', () => {
            const buffer = textModule.createBuffer('abc\nefg');

            const range = textModule.createTextRange({column: 1, line: 0}, {column: 1, line: 1});
            buffer.replaceRange(range, 'replaced!\nline');

            const data = buffer.getText();
            data.should.equal('areplaced!\nlinefg');
        });
        it('Should insert "replaced!\nline"', () => {
            const buffer = textModule.createBuffer('abc\nefg');

            const range = textModule.createTextRange({column: 1, line: 0}, {column: 1, line: 1});
            buffer.insertText(1, 0, 'replaced!\nline');

            const data = buffer.getText();
            data.should.equal('areplaced!\nlinebc\nefg');
        });

        it('Should replace "World"', () => {
            const buffer = textModule.createBuffer('Hello, World\n');
            const range = textModule.createTextRange({column: 7, line: 0}, {column: 12, line: 0});
            buffer.replaceRange(range, 'Alex');

            const data = buffer.getText();
            data.should.equal('Hello, Alex\n');
        });

        it('Should replace "World" (Again)', () => {
            const buffer = textModule.createBuffer('Hello, World Again');
            const range = textModule.createTextRange({column: 7, line: 0}, {column: 12, line: 0});
            buffer.replaceRange(range, 'Alex');

            const data = buffer.getText();
            data.should.equal('Hello, Alex Again');
        });

        it('Should have text that contains "Alex"', () => {
            const buffer = textModule.createBuffer('\n');
            const range = textModule.createTextRange({column: 0, line: 0}, {column: 0, line: 1});
            buffer.replaceRange(range, 'Alex');

            const data = buffer.getText();
            data.should.equal('Alex');
        });

        it('Should have text that contains "Hello, Alex\n"', () => {
            const buffer = textModule.createBuffer('Hello, World\nHello, Everyone\nHello, Again!\n');
            const range = textModule.createTextRange({column: 7, line: 0}, {column: 12, line: 2});
            buffer.replaceRange(range, 'Alex');

            const data = buffer.getText();
            data.should.equal('Hello, Alex!\n');
        });

        it('Should have text that contains "Hello, !\n"', () => {
            const buffer = textModule.createBuffer('Hello, World\nHello, Everyone\nHello, Again!\n');
            const range = textModule.createTextRange({column: 7, line: 0}, {column: 12, line: 2});
            buffer.replaceRange(range, '');

            const data = buffer.getText();
            data.should.equal('Hello, !\n');
        });

        it('Should have text that contains ", World\nHello, Everyone\nHello, Again!\n"', () => {
            const buffer = textModule.createBuffer('Hello, World\nHello, Everyone\nHello, Again!\n');
            const range = textModule.createTextRange({column: 0, line: 0}, {column: 5, line: 0});
            buffer.replaceRange(range, '');

            const data = buffer.getText();
            data.should.equal(', World\nHello, Everyone\nHello, Again!\n');
        });

        it('Should have text that contains "Hello, World\nHello, Everyone\nHello, Again!\nHello, Test"', () => {
            const buffer = textModule.createBuffer('Hello, World\nHello, Everyone\nHello, Again!\n');
            const range = textModule.createTextRange({column: 0, line: 3}, {column: 0, line: 3});
            buffer.replaceRange(range, 'Hello, Test');

            const data = buffer.getText();
            data.should.equal('Hello, World\nHello, Everyone\nHello, Again!\nHello, Test');
        });

        it('Should have text that contains "\nHello, World"', () => {
            const buffer = textModule.createBuffer('\n\n\n');
            const range = textModule.createTextRange({column: 0, line: 1}, {column: 0, line: 2});
            buffer.replaceRange(range, 'Hello, World');

            const data = buffer.getText();
            data.should.equal('\nHello, World\n');
        });

        it('Should have text that contains "\nHello,\nWorld"', () => {
            const buffer = textModule.createBuffer('\nHello,\n\nWorld');
            const range = textModule.createTextRange({column: 6, line: 1}, {column: 0, line: 2});
            buffer.replaceRange(range, '');

            const data = buffer.getText();
            data.should.equal('\nHello,\nWorld');
        });

        it('Should have text that contains "\nHello,\nWorld"', () => {
            const buffer = textModule.createBuffer('\nHello,\n\nWorld');
            const range = textModule.createTextRange({column: 0, line: 2}, {column: 0, line: 3});
            buffer.replaceRange(range, '');

            const data = buffer.getText();
            data.should.equal('\nHello,\nWorld');
        });

        it('Should have text that contains "Hello, World"', () => {
            const buffer = textModule.createBuffer('');
            const range = textModule.createTextRange({column: 0, line: 0}, {column: 0, line: 0});
            buffer.replaceRange(range, 'Hello, World');

            const data = buffer.getText();
            data.should.equal('Hello, World');
        });
    });

    describe('#getText()', () => {
        it('Should return "Hello, \nWorld"', () => {
            const buffer = textModule.createBuffer('Hello, \nWorld');
            const data = buffer.getText();
            data.should.equal('Hello, \nWorld');
        });
        it('Should return "Hello, World\n"', () => {
            const buffer = textModule.createBuffer('Hello, World\n');
            const data = buffer.getText();
            data.should.equal('Hello, World\n');
        });
    });

    describe('#lineCount()', () => {
        it('Should return 3', () => {
            const buffer = textModule.createBuffer('line 1\nline 2\nline3');
            const numberOfLines = buffer.getLineCount();

            numberOfLines.should.equal(3);
        });

        it('Should return 4', () => {
            const buffer = textModule.createBuffer('line 1\nline 2\nline3\n');
            const numberOfLines = buffer.getLineCount();

            numberOfLines.should.equal(4);
        });
    });

});

import {TextBuffer} from './text-buffer';
import {sortRange} from './utils';
import {TextPosition} from './text-position';
import {TextRange} from './text-range';
import {ImmutableTextRange} from './immutable-text-range';

export class BasicTextBuffer implements TextBuffer {
    private table: string[][];

    constructor(private originalText: string, private lineDelimiter = '\n') {
        this.init();
    }

    getLineCount(): number {
        return this.table.length;
    }

    getText(): string {
        const n = this.table.length;
        const lineBuffer = [];

        for (let line = 0; line < n; line++) {
            lineBuffer.push(this.table[line].join(''));
        }

        return lineBuffer.join(this.lineDelimiter);
    }

    replaceRange(range: TextRange, text: string): TextRange | undefined {
        range = new ImmutableTextRange(sortRange([range.start, range.end]));

        const table = this.buildTable(text, this.lineDelimiter);

        const endLine = range.end.line;


        if (this.table[range.start.line] !== undefined && this.table[endLine] !== undefined) {
            const removePosition = this.removeRange(range);
            let lastChangedLine = removePosition.line;
            if (!this.lineExists(lastChangedLine)) {
                while (!this.lineExists(lastChangedLine) && lastChangedLine > 0) {
                    lastChangedLine--;
                }
                if (this.lineExists(lastChangedLine)) {
                    this.table.push([]);
                    lastChangedLine++;
                } else {
                    // If text is empty
                    this.table[lastChangedLine] = [];
                }
            }
            const lastChangedCol = removePosition.column;

            const startPos = {column: lastChangedCol, line: lastChangedLine};
            const endPos = {column: 0, line: lastChangedLine};

            const n = table.length;

            for (let i = 0; i < n; i++) {
                if (n === 1) {
                    const chars = text.split('');

                    for (let j = 0; j < table[i].length; j++) {
                        endPos.column = lastChangedCol + j + 1;
                        const ch = chars[j];
                        this.table[lastChangedLine + i].splice(j + lastChangedCol, 0, ch);
                    }
                } else if (i === (n - 1)) {
                    endPos.line = lastChangedLine + i;
                    for (let j = 0; j < table[i].length; j++) {
                        endPos.column = lastChangedCol + j + 1;
                        const ch = table[i][j];

                        this.table[lastChangedLine + i].splice(j, 0, ch);
                    }
                } else {
                    if (i === 0) {
                        this.insertText(lastChangedCol, lastChangedLine, table[i].join('') + this.lineDelimiter);
                    } else {
                        this.table.splice(lastChangedLine + i, 0, table[i]);
                    }
                }
            }

            const newRange = new ImmutableTextRange(sortRange([startPos, endPos]));

            return newRange;
        } else {
            return undefined;
        }
    }

    removeRange(range: TextRange): TextPosition {
        range = new ImmutableTextRange(sortRange([range.start, range.end]));

        const start = range.start;
        const end = range.end;
        const line = start.line;

        let startCol = start.column;
        let prefixChars: string[] = [];

        for (let i = start.line; i <= end.line; i++) {

            const colEnd = (i === end.line) ? end.column : this.getColumnCount(line);

            for (let col = startCol; col < colEnd; col++) {
                this.removeColumn(startCol, line);
            }

            if (!this.isLineEmpty(line) || i === end.line) {

                if (i !== end.line) {
                    prefixChars = this.table[line];
                    this.removeLine(line);
                    startCol = 0;
                } else {
                    this.table[line] = prefixChars.concat(this.table[line]);
                }
            } else {
                this.removeLine(line);
            }
        }

        return {line: line, column: (prefixChars.length > 0) ? prefixChars.length : startCol};

    }

    getRangeText(range: TextRange): string {
        const linesBuffer = [];
        range = new ImmutableTextRange(sortRange([range.start, range.end]));

        const start = range.start;
        const end = range.end;

        for (let line = start.line; line <= end.line; line++) {
            const colEnd = (line === end.line) ? end.column : this.getColumnCount(line);
            const chars = [];
            const colStart = (line === start.line)  ? start.column : 0;

            for (let col = colStart; col < colEnd; col++) {
                const ch = this.charAt(col, line);

                if (ch !== undefined) {
                    chars.push(ch);
                } else {
                    break;
                }
            }

            linesBuffer.push(chars.join(''));
        }

        return linesBuffer.join('\n');
    }

    removeLineRange(lineStart: number, lineEnd: number) {
        for (let line = lineStart; line <= lineEnd; line++) {
            this.removeLine(lineStart);
        }
    }

    removeFirstLine() {
        this.removeLine(0);
    }

    removeLastLine() {
        this.removeLine(this.getLineCount() - 1);
    }

    removeLine(line: number) {
        this.table.splice(line, 1);
    }

    isLineEmpty(line: number): boolean {
        return this.table[line] && this.table[line].length === 0;
    }

    replaceTextInLine(line: number, lineText: string) {
        const table = this.buildTable(lineText, this.lineDelimiter);
        this.table[line] = table[0];
    }

    insertTextAtLine(line: number, text: string) {
        const table = this.buildTable(text, this.lineDelimiter);

        for (let i = 0; i < table.length; i++) {
            const chars = table[i];
            this.table.splice(line + i, 0, chars);
        }
    }

    lineExists(line: number) {
        return this.table[line] !== undefined;
    }

    getLine(line: number): string {
        return this.table[line].join('');
    }

    getLineRange(lineStart: number, lineEnd: number): string {
        const sb = [];

        for (let line = lineStart; line < lineEnd; line++) {
            sb.push(this.getLine(line));
        }

        return sb.join('\n');
    }

    columnExists(column: number, line: number) {
        return this.table[column][line] !== undefined;
    }

    getColumnCount(line: number): number {
        if (this.table[line] !== undefined) {
            return this.table[line].length;
        }

        return -1;
    }

    charAt(column: number, line: number): string | undefined {
        return this.table[line][column];
    }


    insertText(column: number, line: number, text: string) {
        const table = this.buildTable(text, this.lineDelimiter);

        if (table.length > 1) {
            const n = table.length;

            for (let i = 0; i < n; i++) {
                if (i === (n - 1)) {
                    for (let j = 0; j < table[i].length; j++) {
                        const ch = table[i][j];
                        this.table[line].splice(j, 0, ch);
                    }
                } else {
                    if (i === 0) {
                        const chars = [];

                        //
                        // Build up a char buffer for columns
                        // that may exist in text before the starting
                        // column.
                        //
                        for (let j = 0; j < column; j++) {
                            chars.push(this.table[line][0]);
                            this.table[line].splice(0, 1);
                        }

                        this.table.splice(line++, 0, chars.concat(table[i]));

                    } else {
                        this.table.splice(line, 0, table[i]);
                        line++;
                    }
                }
            }
        } else if (this.table[line]) {
            const chars = text.split('');

            for (let i = 0; i < chars.length; i++) {
                const ch = chars[i];
                this.table[line].splice(column + i, 0, ch);
            }
        }

    }

    removeColumn(column: number, line: number) {
        if (this.table[line]) {
            this.table[line].splice(column, 1);
        }
    }

    getColumnRange(columnStart: number, columnEnd: number, line: number): string {
        const sb = [];

        for (let column = columnStart; column < columnEnd; column++) {
            const ch = this.charAt(column, line);

            if (ch !== undefined) {
                sb.push(ch);
            } else {
                break;
            }
        }

        return sb.join('');
    }

    removeColumnRange(columnStart: number, columnEnd: number, line: number) {
        for (let column = columnStart; column < columnEnd; column++) {
            this.removeColumn(columnStart, line);
        }
    }

    private init() {
        this.table = this.buildTable(this.originalText, this.lineDelimiter);
    }

    private buildTable(text: string, lineDelimiter: string): string[][] {
        const lines = text.split(lineDelimiter);
        const n = lines.length;
        const table = [];

        for (let line = 0; line < n; line++) {
            table[line] = lines[line].split('');
        }

        return table;
    }
}

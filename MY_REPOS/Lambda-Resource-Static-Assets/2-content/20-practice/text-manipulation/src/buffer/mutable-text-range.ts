import {TextPosition} from './text-position';
import {sortRange} from './utils';
import {TextRange} from './text-range';
import {TextBuffer} from './text-buffer';

export class MutableTextRange implements TextRange {
    start: TextPosition;
    end: TextPosition;

    /**
     * @param {[TextPosition , TextPosition]} interval
     * @param {TextBuffer} textBuffer
     */
    constructor(interval: [TextPosition, TextPosition], private textBuffer: TextBuffer) {
        const [start, end] = interval;

        this.start = start;
        this.end = end;
    }

    /**
     * Change the text of the range
     *
     * @param {string} text
     */
    setText(text: string): void {
        const range = this.textBuffer.replaceRange(this, text);
        this.end = range.end;
        this.start = range.start;
    }

    /**
     * Get the text of the range
     * @returns {string}
     */
    getText(): string {
        return this.textBuffer.getRangeText(this);
    }

    /**
     * Sort the range ensuring that start is less than or equal to end
     * start <= end
     *
     * @returns {MutableTextRange}
     */
    sort(): MutableTextRange {
        const [start, end] = sortRange([this.start, this.end]);
        this.start = start;
        this.end = end;

        return this;
    }

    /**
     * The range from start to end exists
     *
     * @returns {boolean}
     */
    exists(): boolean {
        return this.textBuffer.lineExists(this.start.line) &&
            this.textBuffer.columnExists(this.start.column, this.start.line) &&
            this.textBuffer.lineExists(this.end.line) &&
            this.textBuffer.columnExists(this.end.column, this.end.line);
    }
}

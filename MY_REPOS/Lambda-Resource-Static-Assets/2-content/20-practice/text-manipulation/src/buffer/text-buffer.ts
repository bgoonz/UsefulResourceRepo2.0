import {TextPosition} from './text-position';
import {TextRange} from './text-range';

export interface TextBuffer {

    /**
     * The number of lines in the buffer
     * @returns {number}
     */
    getLineCount(): number;

    /**
     * The string representation of the buffer
     * @returns {string}
     */
    getText(): string;

    /**
     * Replaces the  provided text range, with the given text string
     *
     * @param {TextRange} textRange
     * @param {string} text
     * @returns {TextRange | undefined}
     */
    replaceRange(textRange: TextRange, text: string): TextRange | undefined;

    /**
     * Get the text within a specified range
     *
     * @param {TextRange} range
     * @returns {string}
     */
    getRangeText(range: TextRange): string;

    /**
     * Remove the lines between lineStart and lineEnd
     * The range between lineStart and lineEnd is inclusive.
     *
     * @param {number} lineStart
     * @param {number} lineEnd
     */
    removeLineRange(lineStart: number, lineEnd: number): void;

    /**
     * Remove the first line
     */
    removeFirstLine(): void;

    /**
     * Remove the last line
     */
    removeLastLine(): void;

    /**
     * Remove the specified line number
     *
     * (Lines are zero indexed)
     *
     * @param {number} line
     */
    removeLine(line: number): void;

    /**
     * Checks a if a specified line is empty
     *
     * (Lines are zero indexed)
     *
     * @param {number} line
     * @returns {boolean}
     */
    isLineEmpty(line: number): boolean;

    /**
     * Insert a new text line before the specified line
     *
     * (Lines are zero indexed)
     *
     * @param {number} line
     * @param {string} textLine
     */
    insertTextAtLine(line: number, textLine: string): void;

    /**
     * Check if a line exists
     *
     * (Lines are zero indexed)
     *
     * @param {number} line
     * @returns {boolean}
     */
    lineExists(line: number): boolean;

    /**
     * Get the string of an entire line
     *
     * (Lines are zero indexed)
     *
     * @param {number} line
     * @returns {string}
     */
    getLine(line: number): string;

    /**
     * Get all the lines within the inclusive line range
     *
     * @param {number} lineStart
     * @param {number} lineEnd
     * @returns {string}
     */
    getLineRange(lineStart: number, lineEnd: number): string;

    /**
     * Check if the column in the line exists, in the text buffer
     *
     * @param {number} column
     * @param {number} line
     * @returns {boolean}
     */
    columnExists(column: number, line: number): boolean;

    /**
     * Count the number of columns in the line
     *
     * @param {number} line
     * @returns {number}
     */
    getColumnCount(line: number): number;

    /**
     * Read the character at the given line and column
     *
     * @param {number} column
     * @param {number} line
     * @returns {string}
     */
    charAt(column: number, line: number): string;

    /**
     * Insert text at the specified column and line
     *
     * @param {number} column
     * @param {number} line
     * @param {string} text
     */
    insertText(column: number, line: number, text: string): void;

    /**
     * Remove a column
     *
     * @param {number} column
     * @param {number} line
     */
    removeColumn(column: number, line: number): void;

    /**
     * Get text between columnStart and up to  but not including columnEnd
     *
     * @param {number} columnStart
     * @param {number} columnEnd
     * @param {number} line
     * @returns {string}
     */
    getColumnRange(columnStart: number, columnEnd: number, line: number): string;

    /**
     * Remove the text between columnStart and up to but not including columnEnd
     *
     * @param {number} columnStart
     * @param {number} columnEnd
     * @param {number} line
     */
    removeColumnRange(columnStart: number, columnEnd: number, line: number): void;
}

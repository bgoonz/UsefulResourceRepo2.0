import {BasicTextBuffer} from './basic-text-buffer';
import {TextBuffer} from './text-buffer';
import {TextPosition} from './text-position';
import {TextRange} from './text-range';
import {ImmutableTextRange} from './immutable-text-range';

export * from './text-buffer';
export * from './basic-text-buffer';
export * from './text-range';
export * from './mutable-text-range';
export * from './immutable-text-range';

/**
 * Create a Textbuffer
 *
 * @param {string} text
 * @param {string} lineDelimiter
 * @returns {TextBuffer}
 */
export function createBuffer(text: string, lineDelimiter = '\n'): TextBuffer {
    return new BasicTextBuffer(text, lineDelimiter);
}

/**
 * Create a TextRange
 *
 * @param {TextPosition} start
 * @param {TextPosition} end
 * @returns {TextRange}
 */
export function createTextRange(start: TextPosition, end: TextPosition): TextRange {
    return new ImmutableTextRange([start, end]);
}

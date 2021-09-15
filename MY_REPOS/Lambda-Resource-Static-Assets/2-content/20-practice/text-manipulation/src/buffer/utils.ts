import {TextPosition} from './text-position';

function cmp(a: TextPosition, b: TextPosition): number {
    return (a.line - b.line) || (a.column - b.column);
}

/**
 * Sort the provided range
 *
 * @param {[TextPosition , TextPosition]} range
 * @returns {[TextPosition , TextPosition]}
 */
export function sortRange(range: [TextPosition, TextPosition]): [TextPosition, TextPosition] {
    let start: TextPosition;
    let end: TextPosition;

    // range[0] is less than range[1]
    if (cmp(range[0], range[1]) < 0) {
        start = range[0];
        end = range[1];
    } else {
        // range[1] is less than range[0]
        start = range[1];
        end = range[0];
    }

    return [start, end];
}


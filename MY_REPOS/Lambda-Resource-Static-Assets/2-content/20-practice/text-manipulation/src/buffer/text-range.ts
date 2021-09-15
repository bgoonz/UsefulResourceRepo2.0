import {TextPosition} from './text-position';
import {sortRange} from './utils';

export interface TextRange {
    /**
     * The start of the range
     */
    readonly start: TextPosition;
    /**
     * The end of the range
     */
    readonly end: TextPosition;
}

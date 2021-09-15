import {TextPosition} from './text-position';
import {TextRange} from './text-range';

export class ImmutableTextRange implements TextRange {
    private _start: TextPosition;
    private _end: TextPosition;

    constructor(interval: [TextPosition, TextPosition]) {
        const [start, end] = interval;

        this._start = start;
        this._end = end;
    }

    get start() {
        return this._start;
    }

    get end() {
        return this._end;
    }

}

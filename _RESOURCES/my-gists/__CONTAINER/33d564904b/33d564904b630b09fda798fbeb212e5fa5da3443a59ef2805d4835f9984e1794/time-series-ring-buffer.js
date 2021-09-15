var TimeSeriesRingBuffer = function(size) {
    this._lastTS = 0;
    this._size = size;
    this.reset();
};

TimeSeriesRingBuffer.prototype.reset = function(){
    this._buffer = new Array(this._size);
    for (var i = 0; i < this._size; i++) {
        this._buffer[i] = 0;
    }
};

TimeSeriesRingBuffer.prototype._refresh = function() {
    var currTS = parseInt(new Date().getTime() / 1000, 10);
    var delta = currTS - this._lastTS;

    if (delta > 300) {
        this.reset();
    } else if (delta > 0) {
        for (var i = 1; i < delta + 1; i++) {
            this._buffer[(this._lastTS + i) % this._size] = 0;
        }
    }
    this._lastTS = currTS;
}

TimeSeriesRingBuffer.prototype.push = function() {
    this._refresh();
    this._buffer[this._lastTS % this._size]++;
};

TimeSeriesRingBuffer.prototype.sum = function() {
    this._refresh();
    var count = 0;
    for (var i = 0; i < this._size; i++) {
        count += this._buffer[i];
    }
    return count;
};

TimeSeriesRingBuffer.prototype.avg = function() {
    return this.sum() / this._size;
};
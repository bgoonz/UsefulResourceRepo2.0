var Promise = function () {
    var self = this;
    if (!(self instanceof Promise)) return new Promise();
    self.resolveCallbacks = [];
    self.rejectCallbacks = [];
    
    self.resolve = function (value) {return self._resolve(value);};
    self.reject = function (error) {return self._reject(error);};
    
    self.done = false;
    self.error = null;
    self.value = null;
};

Promise.prototype.then = function (onResolved, onRejected) {
    var self = this;
    
    onResolved && self.resolveCallbacks.push(onResolved);
    onRejected && self.rejectCallbacks.push(onRejected);
    self._fulfill();
       
    return self;
};

Promise.prototype._resolve = function (value) {
    var self = this;
    if (self.done) return self;
    self.done = true;
    self.value = value;
    return self._fulfill();   
};

Promise.prototype._reject = function (error) {
    var self = this;
    if (self.done) return self;
    self.done = true;
    self.error = error;    
    return self._fulfill();
};

Promise.prototype._fulfill = function () {
    var self = this;
    if (!self.done) {
        return self;
    }
    
    if (self.error !== null) {
        self.rejectCallbacks.forEach(function (error) {
            error(self.error);
        });
    } else {
        self.resolveCallbacks.forEach(function (ok) {
            ok(self.value);
        });
    }
    
    return this;
};

Promise.prototype.toString = function () {
    return "[object Promise]";
};
var Promise = function () {
    var self = this;
    if (!(self instanceof Promise)) return new Promise();
    self.resolveCallbacks = [];
    self.rejectCallbacks = [];
    
    self.done = false;
    self.error = null;
    self.value = null;
    self.chain = null;
};

Promise.prototype.then = function (onResolved, onRejected) {
    var self = this;
 
    if (!self.chain) {
        self.chain = new Promise();
    }
    
    onResolved && self.resolveCallbacks.push(onResolved);
    onRejected && self.rejectCallbacks.push(onRejected);
    self.fulfill();
       
    return self.chain;
};

Promise.prototype.resolve = function (value) {
    var self = this;
    if (self.done) return self;
    self.done = true;
    self.value = value;
    return self.fulfill();   
};

Promise.prototype.reject = function (error) {
    var self = this;
    if (self.done) return self;
    self.done = true;
    self.error = error;    
    return self.fulfill();
};

Promise.prototype.fulfill = function () {
    var self = this;
    if (!self.done) {
        return self;
    }
    
    try {
    if (self.error !== null) {
        self.rejectCallbacks.forEach(function (error) {
            var errorResult = error(self.error);
            if (!self.chain.pipeTo(errorResult)) {
                self.chain.reject(errorResult);
            }
        });
    } else {
        self.resolveCallbacks.forEach(function (ok) {
            var okResult = ok(self.value);        
            if (!self.chain.pipeTo(okResult)) {
                self.chain.resolve(okResult);
            }
        });
    }
    } catch (e) {
        self.chain.reject(e);
    }
    
    return this;
};

Promise.prototype.pipeTo = function (promise) {
    var self = this;
    if (promise instanceof Promise) {
        promise.then(function (result) {
            self.resolve(result);
        }, function (error) {
            self.reject(error)
        });
        return true;
    }
    return false;
};
var overloaded = function() {
    var functions = Array.prototype.slice.call(arguments, 0);
    return function() {
        try {
            var functionToInvoke = functions.filter(function(x) { 
                return x.length == arguments.length; 
            })[0];
            
            functionToInvoke.apply(this, arguments);
        }
        catch (error) { throw new Error('no appropriate overload found'); }
    };
};

// Example
var foo = overloaded(function(a) {

}, function(a, b) {

}, function(a, b, c) {

});
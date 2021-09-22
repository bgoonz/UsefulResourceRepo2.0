var x = function () {
    var i = -5; 
    return x = function () {
        return ++i ? x : true;
    };
};

x() === x()() === x()()()
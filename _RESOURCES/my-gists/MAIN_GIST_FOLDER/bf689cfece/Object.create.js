// without 2nd argument support
if (typeof Object.create !== 'function') {
  Object.create = function(o, props) {
     function F() {}
     F.prototype = o;
    return new F();
  }
}


// with 2nd argument support
if (typeof Object.create !== 'function') {
  Object.create = function(o, props) {
     function F() {}
     F.prototype = o;
     var result = new F();

     if (typeof props === 'object') {
        for (prop in props) {
           if (props.hasOwnPropertyOf(prop)) result[prop] = props[prop].value;
        }
       
     }

     return result;
  }
}
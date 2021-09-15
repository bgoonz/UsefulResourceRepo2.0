let greaterCB = function (val, callback1, callback2) {
  return Math.max(callback1(val), callback2(val));
};
// even shorter, cause why not 
let greaterCB = ( val, cb1, cb2 ) => Math.max( cb1( val ), cb2( val ) );

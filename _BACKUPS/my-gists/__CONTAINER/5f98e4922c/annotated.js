// added some curly braces for readability
function(
  a, // {Object} program @see test.html for details
  b, // {Number[]} tape
  c, // {String} end state
  d, // {String} start state
  e  // [{Number} = 0] caret position
) {

while(
  d < c // while ! eof program
) {
    /* 'e |= 0' - if e is undefined - reset to 0 else leave as is */
    with (/* q = */a[d][b[e |= 0] || "B"]) { // push current program statement aka "q" to the top of current scope
      b[e] = w, // chenge symbol under caret, w is the item of "q"
      e += m, // move caret by ..., m is the item of "q"
      d = n; // jump to next state, n is the item of "q"
    }
}

return b

}
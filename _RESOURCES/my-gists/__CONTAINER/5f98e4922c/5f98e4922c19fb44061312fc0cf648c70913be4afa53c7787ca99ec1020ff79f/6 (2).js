// option 5:
if (x === 0) {
  // ..
}
else if (x === 1) {
  // ..
}
else if (x === 2) {
  // ..
}
else if (x === 3) {
  // ..
}
else {
  throw new Error("impossible to get here");
  
  // note: because this else {} clause cannot be reached, Istanbul will
  // complain about never reaching it
}
// option 6:
if (x === 0) {
  // ..
}
if (x === 1) {
  // ..
}
if (x === 2) {
  // ..
}
if (x === 3) {
  // ..
}
// note: all 4 omitted else clauses are actually "reached" in this
// construct, so Istanbul will *NOT* complain

// note 2: in this case, each independent `if` test clause automatically
// (mathematically) excludes the previous ones -- `x` can never be two or
// more values at the same time. general test clauses would need to explicitly
// exclude previous conditions, like:
//   if (A) { .. }
//   if (!A && B) { .. }
//   if (!(A || B) && C) { .. }
//   if (!(A || B || C) && D) { .. }

// note 3: this option is also a bit more "dangerous" in that if one of the 
// if blocks reassigned `x`, then it could potentially (and accidentally) match
// more than one clause, unlike an if..else if series
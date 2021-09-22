// option 7:
switch (true) {
  case (x === 0): {
    // ..
    break;
  }
  case (x === 1): {
    // ..
    break;
  }
  case (x === 2): {
    // ..
    break;
  }
  case (x === 3):
  default: {
    // ..
  }
  // note: some linter configs may complain about the lack of a `break`
  // (aka, "fall-through") in this construct
}
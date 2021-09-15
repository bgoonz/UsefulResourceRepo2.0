let arr1 = ["a", "b", "c"];
  let longer = [...arr1, "d", "e"]; // ["a", "b", "c", "d", "e"]
  // without spread syntax, this would give you a nested array
  let withoutRest = [arr1, "d", "e"] // [["a", "b", "c"], "d", "e"]
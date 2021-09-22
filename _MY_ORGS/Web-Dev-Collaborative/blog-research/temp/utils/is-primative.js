function isPrimitive( val ) {
  return val == null || val === true || val === false ||
    typeof val === "string" || typeof val === "number";

}

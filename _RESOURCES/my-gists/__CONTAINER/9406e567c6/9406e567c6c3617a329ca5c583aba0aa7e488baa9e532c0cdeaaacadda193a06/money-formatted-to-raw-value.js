function moneyRawValue(value = 0, decimalSeparator = ",") {
  if (typeof value === "number") {
    return value;
  }
  const rawValue = parseFloat(
    value
      .replace(/\((?=\d+)(.*)\)/, "-$1")
      .replace(new RegExp(`[^0-9-${decimalSeparator}]`, "g"), "")
      .replace(decimalSeparator, ".")
  );
  return !isNaN(rawValue) ? rawValue : 0;
}
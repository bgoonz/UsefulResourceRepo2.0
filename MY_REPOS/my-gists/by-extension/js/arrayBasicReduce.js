// Arrays of expenses.
var oldExpenses = [
  { company: "BigCompany Co.", value: 1200.10},
  { company: "Pineapple Inc.", value: 3107.02},
  { company: "Office Supplies Inc.", value: 266.97}
];
var newExpenses = [
  { company: "Office Supplies Inc.", value: 108.11},
  { company: "Megasoft Co.", value: 1208.99}
];

// Simple summation function
var sumValues = function(sum, x){
  return sum + x.value;
}

// Reducing the first array to a sum of values.
var oldExpensesSum = oldExpenses.reduce(sumValues, 0.0);
// Reducing the second array to a sum of values.
console.log(newExpenses.reduce(sumValues, oldExpensesSum)); // 5891.19
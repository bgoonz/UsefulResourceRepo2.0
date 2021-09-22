// MODULE PATTERN --------------------------------------------------

// var expenser = (function() {
//   var expenses = [];

//   function _addExpense(amount) {
//     if (!isNaN(parseFloat(amount)) && isFinite(amount)) {
//       expenses.push(amount);
//     } else {
//       alert('Invalid value, enter number!');
//     }
//   }

//   function _attachAmountToElement(totalExpenses) {
//     if ($('#expenses').length > 0) {
//       $('#expenses').html(totalExpenses + ' $ expenses')
//     }
//   }

//   return {
//     displayExpenses: function() {
//       _attachAmountToElement(expenser.countExpenses());
//     },

//     addExpense: function(amount) {
//       _addExpense(amount);
//       expenser.countExpenses()
//     },

//     countExpenses: function() {
//       var totalExpenses = 0;
//       for (var i = 0; i < expenses.length; i++) {
//         totalExpenses += expenses[i];
//       }

//       return totalExpenses;
//     }
//   }
// })()

// REVEAL PATTERN --------------------------------------------------

var expenser = (function () {
  var expenses = [];

  function _addExpense(amount) {
    if (!isNaN(parseFloat(amount)) && isFinite(amount)) {
      expenses.push(amount);
    } else {
      alert("Invalid value, enter number!");
    }
  }

  function _attachAmountToElement(totalExpenses) {
    if ($("#expenses").length > 0) {
      $("#expenses").html(totalExpenses + " $ expenses");
    }
  }

  function displayExpenses() {
    _attachAmountToElement(countExpenses());
  }

  function addExpense(amount) {
    _addExpense(amount);
    countExpenses();
  }

  function countExpenses() {
    var totalExpenses = 0;
    for (var i = 0; i < expenses.length; i++) {
      totalExpenses += expenses[i];
    }

    return totalExpenses;
  }

  return {
    add: addExpense,
    display: displayExpenses,
    count: countExpenses,
  };
})();

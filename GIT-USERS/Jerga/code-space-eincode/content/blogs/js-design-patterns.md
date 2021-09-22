---
title: JS reveal and module design patterns
subtitle: I decided to make an overview and examples of most common and known design patterns in JS.
date: 2021-11-11
slug: js-design-patterns
author: Filip Jerga
rating: 4
coverImage: https://cdn.sanity.io/images/55mm68d3/production/75b7a4b0f15c0f32c3555c749df6d4b86cd9d79f-1000x666.jpg?h=600&fm=jpg&q=70
---

# Javascript reveal and module design patterns

## I decided to make an overview and examples of most common and known design patterns in JS that is good to know. Even today when there is plenty of frameworks like angular, react, vue, ember… and you think you do not need basics.

![TODO: provide alt](https://cdn.sanity.io/images/55mm68d3/production/75b7a4b0f15c0f32c3555c749df6d4b86cd9d79f-1000x666.jpg?h=600&fm=jpg&q=70)</div>

---

All of these frameworks abstract a code and make it simpler for us. So it is good to go back to start, it will help us understand the code better and improve our thinking.

You can clone my repo with a basic template from [Github Repo](https://github.com/Jerga99/design_patterns). All design pattern commits are tagged.

Today I will start with **Module and Reveal** design patterns. They are both very similar and serve the same purpose. I will start with a module design pattern.

Lets imagine we want to create a library for counting and displaying expenses. We will have something like this:

    var expenses = [];
    function mountAmountToView(totalExpenses) {
      if ($('#expenses').length > 0) {
        $('#expenses').html(totalExpenses + ' $ expenses')
      }
    };
    function displayExpenses() {
      mountAmountToView(countExpenses());
    };
    function addExpense(amount) {
      expenses.push(amount);
      return countExpenses()
    };
    function countExpenses() {
      var totalExpenses = 0;
      for (var i = 0; i < expenses.length; i++) {
        totalExpenses += expenses[i];
      }
      return totalExpenses;
    };

I am sure you can see what the problem is in this case. All of this code, every single function and variables are exposed to a global view. That means everybody can manipulate expenses array and all of the related functions.

For this purposes the **Module Design Pattern** was designed, where we encapsulate our functionality and expose just what we want. We will create an API (application program interface) for our framework/lib call it as you desire. All clients of our code will use this API and will not have access to our “**Private**” context. So lets see. Check a code, try to understand what it does. I made it really simple.

    var expenser = (function() {
      var _expenses = [];
      function _mountAmountToView(totalExpenses) {
        if ($('#expenses').length > 0) {
          $('#expenses').html(totalExpenses + ' $ expenses')
        }
      };
      function _countExpenses() {
        var totalExpenses = 0;
        for (var i = 0; i < _expenses.length; i++) {
          totalExpenses += _expenses[i];
        }
        return totalExpenses;
      };
      return {
        displayExpenses: function() {
          _mountAmountToView(expenser.countExpenses());
        },
        addExpense: function(amount) {
          _expenses.push(amount);
          return expenser.countExpenses()
        },
        countExpenses: function() {
          return _countExpenses();
        }
      }
    })()

Looks better right? Please notice that I am prefixing all private functions and variables with underscore, it reads better. Now we are exposing the “**expenser**” object with all function we return from self called function, rest will stay private. We are assigning to **expenser** variable result of self executed function and that is our API.

Although, as you noticed, in our public functions when we want to call another public function from inside, we need to prefix the function name with name of module, in our case “**expenser**”. Overall when we have big chunks of code it can get messy and unreadable.

That’s why there is reveal design pattern. Here it is:

    var expenser = (function() {
      var _expenses = [];
      function _mountAmountToView(totalExpenses) {
        if ($('#expenses').length > 0) {
          $('#expenses').html(totalExpenses + ' $ expenses')
        }
      };
      function _countExpenses() {
        var totalExpenses = 0;
        for (var i = 0; i < _expenses.length; i++) {
          totalExpenses += _expenses[i];
        }
        return totalExpenses;
      };
      function displayExpenses() {
        _mountAmountToView(countExpenses());
      };
      function addExpense(amount) {
        _expenses.push(amount);
        return countExpenses()
      };
      function countExpenses() {
        return _countExpenses();
      };
      return {
        display: displayExpenses,
        add: addExpense,
        count: countExpenses
      }
    })()

What do you think ? Can you see a difference ? Now we do not need prefix our module name to public functions we are calling from inside of our exposed functions. **We are exposing our API under different names**. Whole code is more readable. **Another positive is we can provide to clients of our API more descriptive names**.

That’s it for today. Hope you like my explanations. If something is not clear just contact me. You can also check more blogs on [https://eincode.com](https://eincode.com)

Filip

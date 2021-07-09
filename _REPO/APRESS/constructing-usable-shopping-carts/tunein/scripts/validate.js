function validate(form) {
  var returnVal = true;
  var formEls = form.elements;
  var currEl, currName, currType, currVal, currField, minimum, maximum, temp;
  var errMsg = "There were problems with the following field(s):\n";
  var firstErr = -1;

  var notWhitespace = /\S/;
  var notAlpha = /[^a-z \-\.\,']/gi;
  var notAlphaNumeric = /[^a-z0-9]/gi;
  var notAddress = /[^\w \-#\.\,\/]/gi;
  var hasSpaces = /\s/g;
  var notInt = /\D/g;
  var isDecimal = /^\d+(\.\d+)?$/;
  var isUSZip = /^\d{5}(-\d{4})?$/;
  var isUSPhone = /^\d{3}[-\.]\d{3}[-\.]\d{4}$/;
  var isEmail = /^\w(\.?[\w-])*@\w(\.?[\w-])*\.[a-z]{2,6}(\.[a-z]{2})?$/i;
  var isCurrency = /^\d+(\.\d{2})?$/;
  var notComment = /[^a-zA-Z0-9\.\,;:%&#$@!\^-_~`"'\[\]\{\}\*\/\?\(\)]/i;

  var requirements = new Array(
    "required",
    "alphabetic",
    "address",
    "alphanumeric",
    "nospace",
    "integer",
    "decimal",
    "minlength",
    "maxlength",
    "ccnumber",
    "uszip",
    "usphone",
    "email",
    "currency",
    "percent",
    "comment"
  );

  for (var i = 0; i < formEls.length; i++) {
    currEl = formEls[i];
    currName = currEl.name;
    currType = currEl.type;
    currValue = currEl.value;
    currField = currName.indexOf("_") != -1 ? currName.split("_")[0] : currName;
    currField = currField.replace(/0/g, " ");
    temp = 0;

    var context = new Object();

    for (var j = 0; j < requirements.length; j++)
      context[requirements[j]] = currName.indexOf(requirements[j]) != -1;

    if (context.minlength) {
      minimum = currName.split("minlength")[1];
      minimum = minimum.split("_")[0];
      minimum = parseInt(minimum);
    }

    if (context.maxlength) {
      maximum = currName.split("maxlength")[1];
      maximum = maximum.split("_")[0];
      maximum = parseInt(maximum);
    }

    switch (currType.toLowerCase()) {
      case "text":
      case "textarea":
      case "password":
        if (
          context.required &&
          (currValue == "" || !notWhitespace.test(currValue))
        ) {
          if (firstErr < 0) firstErr = i;
          errMsg += 'The required field "' + currField + '" was left blank.\n';
          break;
        }
        if (context.alphabetic && notAlpha.test(currValue)) {
          if (firstErr < 0) firstErr = i;
          errMsg +=
            'The field "' + currField + '" contains non-alphabet characters.\n';
        }
        if (context.alphanumeric && notAlphaNumeric.test(currValue)) {
          if (firstErr < 0) firstErr = i;
          errMsg +=
            'The field "' + currField + '" contains illegal characters.\n';
        }
        if (context.address && notAddress.test(currValue)) {
          if (firstErr < 0) firstErr = i;
          errMsg +=
            'The field "' + currField + '" contains illegal characters.\n';
        }
        if (context.nospace && hasSpaces.test(currValue)) {
          if (firstErr < 0) firstErr = i;
          errMsg +=
            'The field "' + currField + '" should not contain any spaces.\n';
        }
        if (context.integer && notInt.test(currValue)) {
          if (firstErr < 0) firstErr = i;
          errMsg +=
            'The field "' +
            currField +
            '" should contain only the digits 0-9.\n';
        }
        if (context.decimal && !isDecimal.test(currValue)) {
          if (firstErr < 0) firstErr = i;
          errMsg +=
            'The value you entered in the field "' +
            currField +
            '" is not a number.\n';
        }
        if (context.minlength && currValue.length < minimum) {
          if (firstErr < 0) firstErr = i;
          errMsg +=
            'The field "' +
            currField +
            '" must contain at least ' +
            minimum +
            " characters.\n";
        }
        if (context.minlength && currValue.length > maximum) {
          if (firstErr < 0) firstErr = i;
          errMsg +=
            'The field "' +
            currField +
            '" must contain at most ' +
            maximum +
            " characters.\n";
        }
        if (context.uszip && !isUSZip.test(currValue)) {
          if (firstErr < 0) firstErr = i;
          errMsg +=
            'The field "' +
            currField +
            '" does not contain a valid 5 or 9 digit ZIP code.\n';
        }
        if (context.usphone && !isUSPhone.test(currValue)) {
          if (firstErr < 0) firstErr = i;
          errMsg +=
            'The field "' +
            currField +
            '" does not contain a valid telephone number.\n';
        }
        if (context.email && !isEmail.test(currValue)) {
          if (firstErr < 0) firstErr = i;
          errMsg +=
            'The field "' +
            currField +
            '" does not contain a valid email address.\n';
        }
        if (context.currency && currValue != "") {
          currValue = currValue.replace(/[$��\,]/g, "");
          if (!isCurrency.test(CurrValue)) {
            if (firstErr < 0) firstErr = i;
            errMsg +=
              'The field "' +
              currField +
              '" does not contain a valid amount.\n';
          }
        }
        if (context.ccnumber) {
          cuurValue = currValue.replace(/[ -]+/g, "");
          if (context.integer && notInt.test(currValue)) {
            if (firstErr < 0) firstErr = i;
            errMsg +=
              'The field "' +
              currField +
              '" should contain only the digits 0-9.\n';
          } else {
            var ccTypeRadio = form.Credit0Card0Type_required;
            var ccTypeRadioLength = ccTypeRadio.length;
            var ccType;
            for (var i = 0; i < ccTypeRadioLength; i++) {
              if (ccTypeRadio[i].checked) {
                ccType = ccTypeRadio[i].value;
                break;
              }
            }

            var currLength = currValue.length;
            var isLength;

            switch (ccType) {
              case "MasterCard":
                isLength = currLength == 16;
                break;
              case "Visa":
                isLength = currLength == 13 || currLength == 16;
                break;
              case "American Express":
                isLength = currLength == 15;
                break;
            }

            if (!isLength) {
              if (firstErr < 0) firstErr = i;
              errMsg +=
                "Wrong number of digits for " + ccType + " credit card.\n";
            } else {
              var prefix;
              var isPrefix = true;
              switch (ccType) {
                case "MasterCard":
                  prefix = currValue.substr(0, 2);
                  isPrefix = prefix > 50 && prefix < 56;
                  break;
                case "Visa":
                  prefix = currValue.substr(0, 1);
                  isPrefix = prefix == 4;
                  break;
                case "American Express":
                  prefix = currValue.substr(0, 2);
                  isPrefix = prefix == 34 || prefix == 37;
                  break;
              }

              if (!isPrefix) {
                if (firstErr < 0) firstErr = i;
                errMsg += "Invalid prefix for " + ccType + " numbers.\n";
              } else {
                var copy = currValue.split("");
                copy.reverse();
                cLength = copy.length;
                var sum = 0;
                var digit, first, second;
                for (var c = 0; c < cLength; c++) {
                  digit = copy[c];
                  if (c % 2 == 1) {
                    digit *= 2;
                    if (digit > 9) {
                      first = digit.substr(0, 1) - 0;
                      second = digit.substr(1, 1) - 0;
                      digit = first + second;
                    }
                  }
                  sum += digit;
                }
                if (sum % 10 != 0) {
                  if (firstErr < 0) firstErr = i;
                  errMsg +=
                    "The number for the " + ccType + " failed to validate.\n";
                  errMsg +=
                    "Please check the number carefully and try again.\n";
                } else {
                  var today = new Date();
                  var currMonth = today.getMonth() + 1;
                  var currYear = today.getFullYear();
                  if (
                    form.Expiration0Year_required == currYear &&
                    form.Expiration0Month < currMonth
                  ) {
                    errMsg +=
                      "Invalid expiration date (you indicated a date in the past).";
                  }
                }
              }
            }
          }
        } else {
          form.elements[i].value = currValue;
        }
        break;

      case "checkbox":
        if (context.required) {
          temp = 0;
          for (var n = 0; n < form[currName].length; n++) {
            if (n < form[currName].length - 1) i++;
            if (form[currName][n].checked) {
              temp++;
            }
          }
          if (!temp && !context.minlength) {
            if (firstErr < 0) firstErr = i;
            errMsg +=
              'You must check at least one of the "' +
              currField +
              '" checkboxes.\n';
          }
          if (context.minlength && temp < minimum) {
            if (firstErr < 0) firstErr = i - (form[currName].length - 1);
            errMsg +=
              "You must check at least " +
              minimum +
              ' of the "' +
              currField +
              '" checkboxes.\n';
          }
          if (context.maxlength && temp > maximum) {
            if (firstErr < 0) firstErr = i - (form[currName].length - 1);
            errMsg +=
              "Please check no more than " +
              maximum +
              ' of the "' +
              currField +
              '" checkboxes.\n';
          }
        }
        break;

      case "radio":
        if (context.required) {
          temp = false;
          for (var n = 0; n < form[currName].length; n++) {
            if (n < form[currName].length - 1) i++;
            if (form[currName][n].checked) {
              temp = true;
            }
          }
          if (!temp) {
            if (firstErr < 0) firstErr = i - (form[currName].length - 1);
            errMsg +=
              'You must select one of the "' + currField + '" radiobuttons.\n';
          }
        }
        break;

      case "select-one":
        if (context.required && !currEl.selectedIndex) {
          if (firstErr < 0) firstErr = i;
          errMsg += 'You must select one of the "' + currField + '" options.\n';
        }
        break;

      case "select-multiple":
        if (context.required || context.minlength || context.maxlength) {
          temp = 0;
          for (n = 0; n < currEl.length; n++)
            if (currEl.options[n].selected) temp++;
        } else break;
        if (!temp && !context.minlength) minimum = 1;
        if (
          (context.minlength && temp < minimum) ||
          (context.required && !temp)
        ) {
          if (firstErr < 0) firstErr = i;
          errMsg +=
            "You must select at least " +
            minimum +
            ' of the "' +
            currField +
            '" options.\n';
        }
        if (context.maxlength && temp > minimum) {
          if (firstErr < 0) firstErr = i;
          errMsg +=
            "You must select no more " +
            maximum +
            ' of the "' +
            currField +
            '" options.\n';
        }
        break;

      case "submit":
      case "reset":
      case "button":
      case "file":
      case "image":
      case "hidden":
        break;

      default:
        alert("         ERROR!!\nWe should never get here!");
        break;
    }
  }
  returnVal = firstErr < 0;
  if (!returnVal) {
    alert(errMsg);
    form.elements[firstErr].focus();
  }
  return returnVal;
}

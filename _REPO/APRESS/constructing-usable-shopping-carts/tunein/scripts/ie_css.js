//  IE emulation for unsupported CSS :hover, :focus pseudoclasses

function domTagObjs(tagName) {
  var tabObjs;

  if (document.all) {
    if (document.getElementsByTagName)
      tagObjs = document.getElementsByTagName(tagName);
    else tagObjs = document.all.tags(tagName);
  }

  return tagObjs;
}

function setHandlers() {
  var inputObjs = domTagObjs("input");
  var numInputs = inputObjs.length;

  var selectObjs = domTagObjs("select");
  var numSelects = selectObjs.length;

  var offColor;

  for (var i = 0; i < numInputs; i++) {
    var currInput = inputObjs[i];
    var currType = currInput.type;

    if (currType == "submit" || currType == "button" || currType == "reset") {
      currInput.onmouseover = function () {
        this.style.backgroundColor = "#FFFFEE";
      };

      if (currInput.className.indexOf("2") == -1) {
        currInput.onmouseout = function () {
          this.style.backgroundColor = "#DDDDDD";
        };
      } else {
        currInput.onmouseout = function () {
          this.style.backgroundColor = "#FFFFFF";
        };
      }
    }

    if (currType != "radio") {
      currInput.onfocus = function () {
        this.style.backgroundColor = "#FFCC66";
      };
      currInput.onblur = function () {
        this.style.backgroundColor = "#DDDDDD";
      };
    }
  }

  for (var j = 0; j < numSelects; j++) {
    var currSelect = selectObjs[j];

    currSelect.onfocus = function () {
      this.style.backgroundColor = "#FFCC66";
    };
    currSelect.onblur = function () {
      this.style.backgroundColor = "#DDDDDD";
    };
  }
}

function init() {
  if (document.all) setHandlers();
}

window.onload = init;

const checkOffset = $.datepicker._checkOffset;

$.extend($.datepicker, {
  _checkOffset: function (inst, offset, isFixed) {
    if (!isFixed) {
      return checkOffset.apply(this, arguments);
    }

    let isRTL = this._get(inst, "isRTL");
    let obj = inst.input[0];

    // copied from Datepicker._findPos (node_modules/jquery-ui/datepicker.js)
    while (
      obj &&
      (obj.type === "hidden" ||
        obj.nodeType !== 1 ||
        $.expr.filters.hidden(obj))
    ) {
      obj = obj[isRTL ? "previousSibling" : "nextSibling"];
    }

    let rect = obj.getBoundingClientRect();

    return {
      top: rect.top,
      left: rect.left,
    };
  },
});

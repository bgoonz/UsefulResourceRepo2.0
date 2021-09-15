exports.bindSelectDataFilter = function (
  select1,
  select2,
  dataAttr,
  backFilter
) {
  var $select1 = $(select1);
  var $select2 = $(select2);
  var $options = $select2.find("option"); // we need to cache these outside of the DOM; unfortunately this will break <optgroups>
  var changeFunc = function () {
    var $oldOption = $select2.find("option:selected");
    var selectValue = $select1.val();
    if (selectValue && selectValue != "0") {
      $select2.html(
        $options.filter(function () {
          var dataValue = $(this).data(dataAttr);
          return !this.value || !dataValue || selectValue == dataValue;
        })
      );
    } else {
      $select2.html($options);
    }
    if ($oldOption.isDetached()) {
      $select2.find("option:enabled:first").prop("selected", true);
    }
  };
  $select1.on("change", changeFunc);
  changeFunc();
  if (backFilter) {
    $select2.on("change", function () {
      var dataValue = $select2.find("option:selected").data(dataAttr);
      if (dataValue) {
        $select1
          .find("option:enabled")
          .filter(function () {
            return this.value == dataValue;
          })
          .first()
          .prop("selected", true);
      }
    });
  }
};

// helper function
$.fn.isDetached = function () {
  return $.contains(document.documentElement, this);
};

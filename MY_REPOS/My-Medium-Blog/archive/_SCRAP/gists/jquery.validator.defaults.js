$.validator.setDefaults({
  onfocusout: function (element, event) {
    if (
      element.tagName === "TEXTAREA" ||
      (element.tagName === "INPUT" && element.type !== "password")
    ) {
      element.value = $.trim(element.value);
    }
    return $.validator.defaults.onfocusout.call(this, element, event);
  },
});

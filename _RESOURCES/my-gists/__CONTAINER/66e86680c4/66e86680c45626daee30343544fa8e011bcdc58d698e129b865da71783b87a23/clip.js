const copyToClipboard = (target) => {
  var currentFocus = document.activeElement;
  target.select();
  target.setSelectionRange(0, target.value.length);

  // copy the selection
  var succeed;
  try {
    succeed = document.execCommand("copy");
    console.log(succeed);
  } catch (e) {
    succeed = false;
    console.log(e);
  }
  // restore original focus
  if (currentFocus && typeof currentFocus.focus === "function") {
    currentFocus.focus();
  }

  return succeed;
};
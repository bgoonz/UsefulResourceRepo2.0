function mySearchFunction() {
  // Declare variables
  var input, filter, ul, li, item, i, txtValue;
  // User Input
  input = document.getElementById("myInput");
  // Filter, makes search not case sensitive
  filter = input.value.toUpperCase();
  // Grabs the parent element by id
  ul = document.getElementById("stateList");
  // Individual item on list
  li = ul.getElementsByTagName("li");

  // Treats lists items like an array, where each item can be accessed through      it's index
  for (i = 0; i < li.length; i++) {
    item = li[i];
    // Iterate over each list item to see if the value of the input, ignoring         case, matches the inner text or inner html of the item.
    txtValue = item.textContent || item.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      // Displays list items that are a match, and nothing if no match
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

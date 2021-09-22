function render() {
  const root = document.getElementById("root");
  var node = document.createElement("DIV");
  var textnode = document.createTextNode("What a nice day!");

  node.appendChild(textnode);
  root.appendChild(node);
}

window.addEventListener("DOMContentLoaded", (event) => {

  const showCart = () => {
    // get shopping cart element
    const cart = document.getElementById("shopping-cart");
    // loop over storage object and get key-value pairs
    for (i=0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      // create a new div for each item
      const basketItem = document.createElement("div");
      basketItem.innerHTML = key + ": " + value;
      basketItem.setAttribute("id", key);
      // add a remove button
      const removeBtn = document.createElement("button");
      removeBtn.innerHTML = "Remove";
      removeBtn.setAttribute("class", "remove-btn");
      basketItem.appendChild(removeBtn);
      // append items to cart element
      cart.appendChild(basketItem);
    };
  };

  const storeItem = () => {
    // get add to cart button
    const addToCartBtn = document.getElementById("add-to-cart");
    // listen for button click event
    addToCartBtn.addEventListener("click", (event) => {
      // grab form input values
      const itemValue = document.getElementById("items").value;
      const itemQuantity = document.getElementById("quantity").value;
      // set local storage key-value pair to form values
      localStorage.setItem(itemValue, itemQuantity);
    });
    showCart();
  };

  const removeItem = () => {
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        // get id of the parent node, which should = key
        const parentID = event.target.parentNode.id;
        localStorage.removeItem(parentID);
        location.reload();
        showCart();
      });
    });
  };

  storeItem();
  removeItem();

});

// Set up listener and test with console.log
window.addEventListener("DOMContentLoaded", (event) => {
  console.log("This is my profile page!");

  // Create and append new h1 element
  const h1 = document.createElement("h1");
  h1.setAttribute("id", "name");
  h1.setAttribute("class", "my-name");
  const h1Text = document.createTextNode("My Name");
  h1.appendChild(h1Text);
  document.body.appendChild(h1);

  // Create and append new ul element
  const myDetailsList = document.createElement("ul");
  myDetailsList.setAttribute("id", "details");
  myDetailsList.setAttribute("class", "my-details");
  document.body.appendChild(myDetailsList);

  // Insert the list items programmatically
  const myDetailsArr = [
    "<li class='detail'>I like to drink iced lattes.</li>",
    "<li class='detail'>I have two cats and eight kittens.</li>",
    "<li class='detail'>My favorite place to get lunch is Chipotle.</li>",
    "<li class='detail'>On the weekends, I play flag football.</li>"
  ]
  const liString = myDetailsArr.join(" ");
  const listElement = document.getElementById("details");
  listElement.innerHTML = liString;

  // Add a new element and insert a clock into it
  const clockDiv = document.createElement("div");
  clockDiv.setAttribute("id", "clock");
  document.body.appendChild(clockDiv);
  const time = () => {
    const date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    clockDiv.innerHTML = "Current time is " + hours + ":" + minutes + ":" + seconds;
  };
  setInterval(time, 500);

});
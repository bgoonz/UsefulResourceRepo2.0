// Handle main navigation menu toggling on small screens
function navToggleHandler(e) {
  e.preventDefault();
  document.body.classList.toggle("js-nav-open");
}

window.addMainNavigationHandlers = function () {
  const navToggle = document.querySelectorAll(".js-nav-toggle");
  if (navToggle) {
    for (let i = 0; i < navToggle.length; i++) {
      navToggle[i].addEventListener("click", navToggleHandler, false);
    }
  }
};

window.removeMainNavigationHandlers = function () {
  document.body.classList.remove("js-nav-open");
  const navToggle = document.querySelectorAll(".js-nav-toggle");
  if (navToggle) {
    for (let i = 0; i < navToggle.length; i++) {
      navToggle[i].removeEventListener("click", navToggleHandler, false);
    }
  }
};

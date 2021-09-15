var sideNavButton = document.querySelector(".sidenavButton");
var isOpen = false;

function smootScroll() {}

document.addEventListener("click", function(e) {
  if (e.target.matches(".filter")) {
    let filters = document.querySelectorAll(".filter");

    filters.forEach(function(filter) {
      filter.classList.remove("active");
    });

    e.target.classList.add("active");

    var cards = document.querySelectorAll(".card");
    var filter = e.target.dataset.filter;

    for (let card of cards) {
      if (filter == "all") {
        card.style.display = "";
      } else if (card.dataset.type.includes(filter)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    }
  }

  if (e.target.tagName == "A" && e.target.hash) {
    e.preventDefault();

    let hash = e.target.hash;
    let section = document.querySelector(hash);

    section.scrollIntoView({ behavior: "smooth" });
  }

  if (
    !isOpen &&
    (e.target.matches(".sidenavButton") || e.target.matches(".bar"))
  ) {
    sideNavButton.classList.toggle("change");
    isOpen = true;
  } else if (
    isOpen &&
    (e.target.matches(".sidenavButton") || e.target.matches(".bar"))
  ) {
    isOpen = false;
    sideNavButton.classList.toggle("change");
  } else if (isOpen && !e.target.matches(".sidenav-link")) {
    isOpen = false;
    sideNavButton.classList.toggle("change");
  }
});

document.addEventListener("scroll", function(e) {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    document.querySelector("header").style.height = "60px";
    document.querySelector("header").style.background = "#252525";
  } else {
    document.querySelector("header").style.height = "";
    document.querySelector("header").style.background = "";
  }
});

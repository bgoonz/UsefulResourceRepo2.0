function debounce(func, wait = 10, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}
const aboutHighlights1 = document.getElementById("about-highlights1");
const aboutTitle = document.getElementById("about-title");
const aboutHighlights2 = document.getElementById("about-highlights2");
const aboutHighlights3 = document.getElementById("about-highlights3");
const projectsTitle = document.getElementById("projects-title");
const projectCards = document.getElementById("project-cards");

function mobileHome(e) {
  slidebar();
}

document
  .getElementById("mobile-home-link")
  .addEventListener("click", mobileHome);

function aboutAnimation(e) {
  aboutHighlights1.classList.add("active");
  aboutHighlights2.classList.add("active");
  aboutHighlights3.classList.add("active");
}
function mobileAboutAnimation(e) {
  aboutHighlights1.classList.add("active");
  aboutHighlights2.classList.add("active");
  aboutHighlights3.classList.add("active");
  slidebar();
}

document.getElementById("about-link").addEventListener("click", aboutAnimation);
document
  .getElementById("mobile-about-link")
  .addEventListener("click", mobileAboutAnimation);

function projectAnimation(e) {
  projectCards.classList.add("active");
}
function mobileProjectAnimation(e) {
  projectCards.classList.add("active");
  slidebar();
}

document
  .getElementById("projects-link")
  .addEventListener("click", projectAnimation);
document
  .getElementById("mobile-projects-link")
  .addEventListener("click", mobileProjectAnimation);

let slidebarOpen = false;
function slidebar(e) {
  slidebarOpen = slidebarOpen === false ? true : false;
  if (slidebarOpen === true) {
    document.getElementById("mobile-links").classList.add("active");
  } else {
    document.getElementById("mobile-links").classList.remove("active");
  }
}

document.getElementById("toggle").addEventListener("click", slidebar);

function checkSlide(e) {
  const textAt = window.scrollY * 1.5;
  const projectsAt = window.scrollY * 3;

  const isShown = textAt > window.innerHeight;
  if (isShown) {
    aboutHighlights1.classList.add("active");
    aboutHighlights2.classList.add("active");
    aboutHighlights3.classList.add("active");
  }
  const projectsShown = projectsAt > window.innerHeight * 3.2;

  if (projectsShown) {
    projectCards.classList.add("active");
  }
}

window.addEventListener("scroll", debounce(checkSlide));

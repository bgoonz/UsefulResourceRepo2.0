const fib = document.querySelector("#fibonacci");
const left = document.querySelector(".fib-left");
const right = document.querySelector(".fib-right");
const updateDisabledStates = function (x) {
  if (x <= 0) {
    left.classList.add("fib-disabled");
  } else {
    left.classList.remove("fib-disabled");
  }
  if (x >= fib.children.length - 9) {
    right.classList.add("fib-disabled");
  } else {
    right.classList.remove("fib-disabled");
  }
};
fib.addEventListener(
  "focus",
  (ev) => {
    const li = ev.target.closest("li");
    const ul = li && li.parentNode;
    if (ul) {
      const x = Array.prototype.indexOf.call(ul.children, li);
      ul.style.setProperty("--fib-offset", x);
      updateDisabledStates(x);
    }
  },
  true
);
left.addEventListener("click", () => {
  const x =
    parseInt(getComputedStyle(fib).getPropertyValue("--fib-offset")) || 0;
  if (x > 0) {
    fib.style.setProperty("--fib-offset", x - 1);
    updateDisabledStates(x - 1);
  }
});
right.addEventListener("click", () => {
  const x =
    parseInt(getComputedStyle(fib).getPropertyValue("--fib-offset")) || 0;
  if (x < fib.children.length - 9) {
    fib.style.setProperty("--fib-offset", x + 1);
    updateDisabledStates(x + 1);
  }
});

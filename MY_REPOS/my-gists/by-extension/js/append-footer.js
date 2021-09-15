  const theDate = new Date();
            const footer = document.querySelector(".site-footer");
            footer.style.fontWeight = "600";
            footer.style.letterSpacing = "0.07rem";
            footer.style.fontFamily = "Share Tech Mono, monospace";
            footer.innerHTML =` © ${theDate.getFullYear()} Bryan Guner;`;
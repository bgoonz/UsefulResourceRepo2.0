async function *getStuff(urls) {
   showSpinner();
   try {
      for (let url of urls) {
         let resp = await fetch(url);
         yield await resp.json();
      }
   }
   finally {
      hideSpinner();
   }
}

var it = getStuff(contentURLs);
cancelBtn.addEventListener("click",() => it.return(),false);

for await (let stuff of it) {
   render(stuff);
}

showSummary();
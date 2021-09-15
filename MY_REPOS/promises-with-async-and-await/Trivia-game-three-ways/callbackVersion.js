export function getClueFromCallback(cb) {
  const xml = new XMLHttpRequest();
  xml.addEventListener("readystatechange", () => {
    if (XMLHttpRequest.DONE !== xml.readyState) return;
    if (xml.status !== 200) return;
    const responseData = JSON.parse(xml.responseText);
    cb(null, responseData);
  });
  xml.open("GET", "https://jservice.xyz/api/random-clue");
  xml.send();
}

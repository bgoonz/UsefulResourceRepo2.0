__ez.ck.get = function (cname, did) {
  if (did !== null) cname = cname + "_" + did;
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
__ez.ck.setByCat = function (cookie, categoryId) {
  if (location.protocol === "https:") {
    cookie = cookie + "; Secure; SameSite=Lax;";
  }
  if (cookie.indexOf("path=") === -1) {
    cookie += "; path=/";
  }
  if (typeof cmpIsOn === "undefined") {
    document.cookie = cookie;
    return;
  }
  if (typeof categoryId === "undefined" || categoryId === null) {
    return;
  }
  var cmpCookie = __ez.ck.get("ezCMPCookieConsent", null);
  cmpCookie = cmpCookie.substring(1, cmpCookie.length);
  if (cmpCookie.indexOf(categoryId + "=1") !== -1) {
    document.cookie = cookie;
  } else if (cmpCookie === "") {
    if (typeof cmpCookies !== "undefined") {
      if (typeof cmpCookies[categoryId] === "undefined") {
        cmpCookies[categoryId] = [];
      }
      cmpCookies[categoryId].push(cookie);
    }
  }
};

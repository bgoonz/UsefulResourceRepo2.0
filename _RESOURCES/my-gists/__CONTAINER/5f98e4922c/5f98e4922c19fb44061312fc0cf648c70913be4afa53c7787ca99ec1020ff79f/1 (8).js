ajax(
  ajaxOptions({
    url: "https://my.other.tld/api",
    headers: {
      "Cache-Control": "no-cache"
    },
    cb: resp => console.log(resp)
  })
);


// *****************************

function ajaxOptions({
  url = "https://some.tld",
  method = "GET",
  headers: {
    "Content-Type": contentType = "text/plain",
    ...otherHeaders
  } = {},
  ...otherSettings  
} = {}) {
  return {
    url, method,
    headers: { "Content-Type": contentType, ...otherHeaders },
    ...otherSettings
  };
}
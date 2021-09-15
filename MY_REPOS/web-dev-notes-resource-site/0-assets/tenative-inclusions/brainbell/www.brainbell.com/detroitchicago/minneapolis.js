__ez.bit = (function () {
  var pixels = [],
    pxURL = "/detroitchicago/greenoaks.gif";
  function AddAndFirePixel(pvId, pixelData) {
    AddPixel(pvId, pixelData);
    Fire();
  }
  function AddPixel(pvId, pixelData) {
    if (__ez.dot.isDefined(pvId) && __ez.dot.isValid(pixelData)) {
      pixels.push({
        type: "pageview",
        pageview_id: pvId,
        domain_id: __ez.dot.getDID(),
        t_epoch: __ez.dot.getEpoch(0),
        data: __ez.dot.dataToStr(pixelData),
      });
    }
  }
  function Fire() {
    if (
      typeof document.visibilityState !== "undefined" &&
      document.visibilityState === "prerender"
    )
      return;
    if (__ez.dot.isDefined(pixels) && pixels.length > 0) {
      while (pixels.length > 0) {
        var j = 5;
        if (j > pixels.length) {
          j = pixels.length;
        }
        var pushPixels = pixels.splice(0, j);
        var pixelURL =
          __ez.dot.getURL(pxURL) +
          "?orig=" +
          (__ez.template.isOrig === true ? 1 : 0) +
          "&ds=" +
          btoa(JSON.stringify(pushPixels));
        __ez.dot.Fire(pixelURL);
      }
    }
    pixels = [];
  }
  return { Add: AddPixel, AddAndFire: AddAndFirePixel, Fire: Fire };
})();

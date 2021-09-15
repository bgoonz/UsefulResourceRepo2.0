__ez.aucep = (function () {
  var pixels = [],
    pxURL = "/porpoiseant/army.gif";
  function AddPixel(adSlot, pixelData) {
    if (
      !__ez.dot.isDefined(adSlot) ||
      __ez.dot.isAnyDefined(
        adSlot.getSlotElementId,
        adSlot.ElementId,
        adSlot.AdUnitPath
      ) == false
    ) {
      return;
    }
    var ad_position_id = parseInt(__ez.dot.getTargeting(adSlot, "ap"));
    var impId = __ez.dot.getSlotIID(adSlot);
    var adUnit = __ez.dot.getAdUnit(adSlot);
    var networkCode = adSlot.AdUnitPath.split("/")[1];
    if (__ez.dot.isDefined(impId, adUnit) && __ez.dot.isValid(pixelData)) {
      var data = {
        type: "auction",
        impression_id: impId,
        domain_id: __ez.dot.getDID(),
        unit: adUnit,
        t_epoch: __ez.dot.getEpoch(0),
        auction_epoch: pixelData["t_epoch"],
        ad_position: ad_position_id,
        country_code: __ez.dot.getCC(),
        pageview_id: __ez.dot.getPageviewId(),
        bid_floor_initial: pixelData["bid_floor_initial"],
        bid_floor_prev: pixelData["bid_floor_prev"],
        bid_floor_filled: pixelData["bid_floor_filled"],
        auction_count: pixelData["auction_count"],
        refresh_ad_count: pixelData["refresh_ad_count"],
        auction_duration: pixelData["auction_duration"],
        multi_ad_unit: pixelData["multi_ad_unit"],
        multi_ad_count: pixelData["multi_ad_count"],
        network_code: parseInt(networkCode),
        data: __ez.dot.dataToStr([new __ezDotData("", "")]),
      };
      if (pixelData["line_item_id"]) {
        data.line_item_id = pixelData["line_item_id"];
      }
      pixels.push(data);
    }
  }
  function Fire() {
    if (
      typeof document.visibilityState !== "undefined" &&
      document.visibilityState === "prerender"
    ) {
      return;
    }
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
          "&sts=" +
          btoa(JSON.stringify(pushPixels));
        if (
          typeof window.isAmp !== "undefined" &&
          isAmp &&
          typeof window._ezaq !== "undefined" &&
          _ezaq.hasOwnProperty("domain_id")
        ) {
          pixelURL += "&visit_uuid=" + _ezaq["visit_uuid"];
        }
        __ez.dot.Fire(pixelURL);
      }
    }
    pixels = [];
  }
  return { Add: AddPixel, Fire: Fire };
})();

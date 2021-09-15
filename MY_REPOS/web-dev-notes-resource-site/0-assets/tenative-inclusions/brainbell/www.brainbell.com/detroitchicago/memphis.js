var __ezDotData = function (name, val) {
  if (typeof name != "string" && name.length == 2) {
    val = name[1];
    name = name[0];
  }
  this.name = name;
  this.val = val;
};
__ez.dot.b64 = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  encode: function (e) {
    var t = "";
    var n, r, i, s, o, u, a;
    var f = 0;
    e = Base64._utf8_encode(e);
    while (f < e.length) {
      n = e.charCodeAt(f++);
      r = e.charCodeAt(f++);
      i = e.charCodeAt(f++);
      s = n >> 2;
      o = ((n & 3) << 4) | (r >> 4);
      u = ((r & 15) << 2) | (i >> 6);
      a = i & 63;
      if (isNaN(r)) {
        u = a = 64;
      } else if (isNaN(i)) {
        a = 64;
      }
      t =
        t +
        this._keyStr.charAt(s) +
        this._keyStr.charAt(o) +
        this._keyStr.charAt(u) +
        this._keyStr.charAt(a);
    }
    return t;
  },
  decode: function (e) {
    var t = "";
    var n, r, i;
    var s, o, u, a;
    var f = 0;
    e = e.replace(/[^A-Za-z0-9+/=]/g, "");
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++));
      o = this._keyStr.indexOf(e.charAt(f++));
      u = this._keyStr.indexOf(e.charAt(f++));
      a = this._keyStr.indexOf(e.charAt(f++));
      n = (s << 2) | (o >> 4);
      r = ((o & 15) << 4) | (u >> 2);
      i = ((u & 3) << 6) | a;
      t = t + String.fromCharCode(n);
      if (u != 64) {
        t = t + String.fromCharCode(r);
      }
      if (a != 64) {
        t = t + String.fromCharCode(i);
      }
    }
    t = Base64._utf8_decode(t);
    return t;
  },
  _utf8_encode: function (e) {
    e = e.replace(/rn/g, "n");
    var t = "";
    for (var n = 0; n < e.length; n++) {
      var r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode((r >> 6) | 192);
        t += String.fromCharCode((r & 63) | 128);
      } else {
        t += String.fromCharCode((r >> 12) | 224);
        t += String.fromCharCode(((r >> 6) & 63) | 128);
        t += String.fromCharCode((r & 63) | 128);
      }
    }
    return t;
  },
  _utf8_decode: function (e) {
    var t = "";
    var n = 0;
    var r = (c1 = c2 = 0);
    while (n < e.length) {
      r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
        n++;
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1);
        t += String.fromCharCode(((r & 31) << 6) | (c2 & 63));
        n += 2;
      } else {
        c2 = e.charCodeAt(n + 1);
        c3 = e.charCodeAt(n + 2);
        t += String.fromCharCode(
          ((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        );
        n += 3;
      }
    }
    return t;
  },
};
__ez.dot.dataToStr = function (pixelData) {
  if (typeof pixelData === "undefined") {
    return [];
  }
  try {
    for (var i in pixelData) {
      pixelData[i].val = pixelData[i].val + "";
    }
  } catch (e) {}
  return pixelData;
};
__ez.dot.getCC = function () {
  var countryCode = "XX";
  if (typeof _ezaq !== "undefined" && _ezaq.hasOwnProperty("country")) {
    countryCode = _ezaq.country;
  }
  return countryCode;
};
__ez.dot.getDID = function () {
  var domainId = "0";
  if (typeof _ezaq !== "undefined" && _ezaq.hasOwnProperty("domain_id")) {
    domainId = _ezaq.domain_id.toString();
  }
  return domainId;
};
__ez.dot.getEpoch = function (tEpoch) {
  if (typeof _ezaq !== "undefined" && _ezaq.hasOwnProperty("t_epoch")) {
    tEpoch = _ezaq.t_epoch;
  }
  return tEpoch;
};
__ez.dot.getPageviewId = function () {
  var pageviewId = "";
  if (typeof _ezaq !== "undefined" && _ezaq.hasOwnProperty("page_view_id")) {
    pageviewId = _ezaq.page_view_id;
  }
  return pageviewId;
};
__ez.dot.getURL = function (pxURL) {
  if (
    (typeof ezJsu !== "undefined" && ezJsu == true) ||
    (typeof _ez_sa !== "undefined" && _ez_sa == true) ||
    (typeof isAmp !== "undefined" && isAmp === true) ||
    (typeof ezWp !== "undefined" && ezWp === true)
  ) {
    pxURL = "//g.ezoic.net" + pxURL;
  }
  return pxURL;
};
__ez.dot.isValid = function (pixelData) {
  for (var i = 0; i < pixelData.length; i++) {
    if (pixelData[i] instanceof __ezDotData === false) {
      console.error("Invalid data. ", pixelData[i]);
      return false;
    }
  }
  return true;
};
__ez.dot.isDefined = function () {
  for (var i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] === "undefined" || arguments[i] === null) {
      console.error("Argument not defined. ", arguments);
      return false;
    }
  }
  return true;
};
__ez.dot.isAnyDefined = function () {
  var result = false;
  for (var i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] !== "undefined" && arguments[i] !== null) {
      result = true;
    }
  }
  if (result == false) {
    console.error("isAnyDefined Arguments not defined. ", arguments);
  }
  return result;
};
__ez.dot.getSlotIID = function (slot) {
  var iid = "0";
  try {
    var map = __ez.dot.getTargetingMap(slot),
      dvid = __ez.dot.getElementId(slot);
    if (dvid.indexOf("div-gpt-ad") === -1) {
      return iid;
    }
    if (typeof map !== "undefined") {
      for (var key in map) {
        if (key.indexOf("iid") !== -1 && typeof map[key][0] !== "undefined") {
          iid = map[key][0];
          break;
        }
      }
    }
  } catch (e) {}
  return iid;
};
__ez.dot.getElementId = function (slot) {
  if (typeof slot.ElementId != "undefined") {
    return slot.ElementId;
  } else {
    return slot.getSlotElementId();
  }
};
__ez.dot.getAdUnitPath = function (slot) {
  if (typeof slot.AdUnitPath != "undefined") {
    return slot.AdUnitPath;
  } else {
    return slot.getAdUnitPath();
  }
};
__ez.dot.getSizes = function (slot) {
  if (typeof slot.Sizes != "undefined") {
    return slot.Sizes;
  } else {
    return slot.getSizes();
  }
};
__ez.dot.getTargeting = function (slot, key) {
  if (typeof slot.Targeting != "undefined") {
    return slot.Targeting[key];
  } else {
    return slot.getTargeting(key)[0];
  }
};
__ez.dot.getTargetingMap = function (slot) {
  if (typeof slot.Targeting != "undefined") {
    return slot.Targeting;
  } else {
    return slot.getTargetingMap();
  }
};
__ez.dot.getAdUnit = function (adSlot, isOrig) {
  if (__ez.template.isOrig === true || isOrig) {
    return (
      __ez.dot.getAdUnitPath(adSlot).split("/").pop() +
      "|~ez~|" +
      __ez.dot.getElementId(adSlot)
    );
  }
  return __ez.dot.getElementId(adSlot);
};
__ez.dot.Fire = function (url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();
};

(function () {
  mpq = [['init', MIXPANEL_TOKEN]];

  var mpmetrics = {}
    , methods = ['track', 'track_funnel', 'register', 'register_once'
               , 'register_funnel', 'identify'];

  for (var i = 0, l = methods.length; i < l; i++)
    (function(method) {
      mpmetrics[method] = function () {
        mpq.push([method].concat(Array.prototype.slice.call(arguments)));
      };
    })(methods[i]);

  // load the real thing
  var mp = document.createElement("script"); mp.type = "text/javascript";
  mp.async = true; mp.src = (document.location.protocol == 'https:' ? 'https:'
    : 'http:') + "//api.mixpanel.com/site_media/js/api/mixpanel.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(mp, s);
})();
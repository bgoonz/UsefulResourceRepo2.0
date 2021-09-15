(function (window) {
  if (!window.safari || !window.safari.pushNotification) return;

  var hp = {
    init: function (websiteId) {
      var permissionData = window.safari.pushNotification.permission('web.net.hipush');

      if (permissionData.permission === 'default')
        window.safari.pushNotification.requestPermission(
          'https://hipush.net/api/apple/website/' + websiteId,
          'web.net.hipush',
          {}
        );
    }
  };

  setTimeout(function () {
    for (var i = 0; i < window.hipush.q.length; i++) {
      var args = window.hipush.q[i];
      hp[args[0]].apply(null, [].splice.call(args, 1));
    }
  }, 0);
}(window));

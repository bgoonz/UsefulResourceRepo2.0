document.querySelector('svg').querySelectorAll('a').forEach(function (a) {
  var u = new URL(a.href.baseVal, document.location.href);
  u.protocol = 'vscode:';
  u.pathname = u.pathname.replace(/^\/*/, '//file/');
  a.href.baseVal = u.href;
});
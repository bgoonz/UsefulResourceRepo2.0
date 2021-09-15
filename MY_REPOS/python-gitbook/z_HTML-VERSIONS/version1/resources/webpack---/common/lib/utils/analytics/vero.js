'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.track =
  exports.setUserId =
  exports.setAnonymousUserId =
  exports.trackPageview =
    void 0;
const utils_1 = require('./utils');
let _script;
const _veroq = [
  [
    'init',
    {
      api_key: '348b8acbc93adcf7c3d647d2abb4f4c22fe880e9',
    },
  ],
];
utils_1.global.veroq = _veroq;
/**
 * For some reason vero doesn't call it, so we do it for them.
 */
function processArray() {
  if (
    typeof utils_1.global.__vero !== 'undefined' &&
    typeof utils_1.global.__vero.processVeroArray === 'function'
  ) {
    utils_1.global.__vero.processVeroArray(_veroq);
  }
}
exports.trackPageview = () => {
  _veroq.push(['trackPageview']);
  processArray();
};
// Already start tracking the first pageview
exports.trackPageview();

function loadScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.onload = resolve;
    script.onerror = () => {
      reject(new Error('Could not load script'));
    };
    script.src = '//d3qxef4rp70elm.cloudfront.net/m.js';
    document.body.appendChild(script);
  })
    .then(() => {
      processArray();
    })
    .catch(() => {
      /* ignore */
    });
}
exports.setAnonymousUserId = (userId) => {
  if (!_script) {
    _script = loadScript();
  }
  _veroq.push([
    'user',
    {
      id: userId,
      email: 'anon@codesandbox.io',
    },
  ]);
  processArray();
};
exports.setUserId = (userId, email) => {
  if (!_script) {
    _script = loadScript();
  }
  utils_1.debug(`[Vero] Identifying user`);
  _veroq.push([
    'user',
    {
      id: userId,
      email,
    },
  ]);
  try {
    const anonymousUid = localStorage.getItem(utils_1.ANONYMOUS_UID_KEY);
    if (anonymousUid) {
      utils_1.debug(`[Vero] Reidentifying from ${anonymousUid} to ${userId}`);
      _veroq.push(['reidentify', userId, anonymousUid]);
    }
  } catch (e) {
    /* Ignore */
  }
  processArray();
};
exports.track = (eventName, data) => {
  _veroq.push(['track', eventName, data]);
  processArray();
};

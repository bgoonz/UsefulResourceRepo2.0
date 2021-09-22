// myjQuery.js
var jQuery = require('_jQuery'),
    myjQuery = jQuery.noConflict(true);

// Пробрасываем для Bacon на время инициализации
window.jQuery = myjQuery;

require('_Bacon');

// Убиваем ()
try {
    // IE Happens
    delete window.jQuery;
} catch (e) {
    window.jQuery = null;
}

module.exports = myjQuery;

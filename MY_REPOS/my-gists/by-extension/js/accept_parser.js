/**
 * Accept-* header parser in JavaScript - rfc2616 sec 14.4
 * 
 * @param {String} string Accept-*
 * 
 * @return {Array} ordered by weight list of accepted values
 * 
 * @example
 *    acceptLanguageParser('nl;q=0.6, en;q=0.8,el;q=0.4, en-US , de;q=0.2');
 *    // ["en-US", "en", "nl", "el", "de"]
 *    acceptLanguageParser('text/html,application/xhtml+xml,application/xml;q=0.9,*\/*;q=0.8');
 *    // ["text/html", "application/xhtml+xml", "application/xml", "*\/*"]
 */
function acceptLanguageParser(string) {
    var langs = string.split(','), i, c;
    
    for (i = 0, c = langs.length; i < c; i++) {
        langs[i] = langs[i].split(';q=');
        langs[i][1] = +langs[i][1] || 1;
    }
    
    langs = langs.sort(function (a, b) {
        return b[1] - a[1];
    });
    
    for (i = 0, c = langs.length; i < c; i++) {
        langs[i] = langs[i][0].replace(/^\s+|\s+$/, '');
    }
    
    return langs;
}
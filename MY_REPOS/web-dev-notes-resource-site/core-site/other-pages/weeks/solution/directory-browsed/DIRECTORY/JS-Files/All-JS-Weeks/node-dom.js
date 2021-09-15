const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const doms = new Map();

module.exports = function (filename) {
  const parsed = path.parse(filename);
  if (doms.has(parsed.name)) {
    return doms.get(parsed.name).window.document;
  }
  const htmlPath = path.join(parsed.dir, `test-page.html`);
  const html = fs.readFileSync(htmlPath, 'utf-8');
  html.replace(/<script src="test[^"]+"><\/script>/, '');
  const dom = new JSDOM(html);
  doms.set(parsed.name, dom);
  return dom.window.document;
}

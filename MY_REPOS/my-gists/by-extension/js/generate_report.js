'use strict';

/* eslint-disable */

const fs = require('fs');
const path = require('path');

const ReportGenerator = require('../../lighthouse-core/report/report-generator');

const jsonPath = __dirname + '/../_json/';
const filenames = fs.readdirSync(jsonPath).filter(f => f.endsWith('.json'));

console.log(`Writing reports to: ${path.join(__dirname, '/../')}`);
for (const filename of filenames) {
  const fileSlug = filename.replace('.json', '');
  const results = require(path.join(jsonPath, filename));
  const html = ReportGenerator.generateReportHtml(results);

  const filePath = path.join(jsonPath, `/../${fileSlug}.html`);
  fs.writeFileSync(filePath, html, {encoding: 'utf-8'});

  // Create Devtools report that's denser
  // TODO: add in extra styles that devtools manually injects
  const devtoolshtml = html
    .replace(`"lh-root lh-vars"`, `"lh-root lh-vars lh-devtools"`)
    .replace(`<title>Lighthouse Report`, `<title>DevTools Lighthouse Report`)


  const devtoolsFilePath = path.join(jsonPath, `/../z.devtools.${fileSlug}.html`);
  fs.writeFileSync(devtoolsFilePath, devtoolshtml, {encoding: 'utf-8'});
  console.log(` - ${fileSlug.padEnd(12)}: ${html.length.toLocaleString().padStart(11)} bytes`);
}

console.log(`Done. ${new Date().toLocaleTimeString()}`);

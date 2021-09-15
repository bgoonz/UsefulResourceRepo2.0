const fs = require('fs').promises;
const path = require('path');

const sqlPath = path.resolve(__dirname, '..', '..', 'data-access-layer');

const getSqlFile = async fileName => {
  const content = await fs.readFile(path.join(sqlPath, fileName), 'utf-8');
  const lines = content.split('\n');
  return lines.map(l => l.replace(/^--.*$/g, '')).join('\n').trim();
};

module.exports.getSqlFile = getSqlFile;

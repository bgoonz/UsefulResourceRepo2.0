const vscode = require("vscode"); // eslint-disable-line import/no-unresolved
const fs = require("fs");
const path = require("path");
const { colourRegex, supportedFileTypes } = require("./constants");

const decorations = [];

function activate() {
  addMarginColours();
  vscode.window.onDidChangeTextEditorSelection(addMarginColours);
}

function deactivate() {
  removeMarginColours();
}

/**
 * Checks each line of file, testing whether a colour value is present
 * and adds colour into margin next to line number if found
 */
function addMarginColours() {
  const { document } = vscode.window.activeTextEditor;
  const { fileName, lineCount, lineAt } = document;
  const fileExt = fileName.substring(fileName.lastIndexOf(".") + 1);
  if (supportedFileTypes.indexOf(fileExt) === -1) {
    return;
  }

  removeMarginColours();

  const colours = {};
  for (let i = 0, len = lineCount; i < len; i++) {
    const line = lineAt(i).text;
    const matches = line.match(colourRegex);
    if (matches) {
      const colour = matches[0];
      if (!colours[colour]) {
        colours[colour] = [];
      }
      colours[colour].push(i);
    }
  }

  for (const colour in colours) {
    const svgFilePath = generateColourSvg(colour);
    for (const line of colours[colour]) {
      addColourToLine(svgFilePath, line);
    }
  }
}

function removeMarginColours() {
  while (decorations.length > 0) {
    decorations.pop().dispose();
  }
}

/**
 * Generates an svg file for the specified colour
 * SVG is a rounded rectangle of the passed in colour and is saved to <rootDir>/images directory
 * @param {string} colour
 */
function generateColourSvg(colour) {
  const maxSize = 18;
  const size = 12;
  const offset = (maxSize - size) * 0.5;

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${maxSize}" height="${maxSize}">
  <rect width="${size}" height="${size}" x="${offset}" y="${offset}" rx="2" ry="2" style="fill:${colour};" />
</svg>`;

  const filePath = path.resolve(__dirname, `../images/colour-${colour}.svg`);
  fs.writeFileSync(filePath, svgContent, "utf8");

  return filePath;
}

/**
 * Adds decorator to the margin of the specified line number, setting the background
 * image url to the colour image file path passed in
 */
function addColourToLine(filePath, line) {
  const { activeTextEditor, createTextEditorDecorationType } = vscode.window;

  const decoration = createTextEditorDecorationType({
    gutterIconPath: filePath,
    gutterIconSize: "100%",
  });
  decorations.push(decoration);

  const start = new vscode.Position(line, 0);
  const end = new vscode.Position(line, 1);
  activeTextEditor.setDecorations(decoration, [new vscode.Range(start, end)]);
}

module.exports = {
  activate,
  deactivate,
};

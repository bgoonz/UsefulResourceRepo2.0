const { readdirSync, readFileSync } = require('fs');
const { join, parse } = require('path');
const ts = require('typescript');

const fileToParse = join(__dirname, '../', 'src', 'index.ts')
let program = ts.createProgram([fileToParse], {});
program.getTypeChecker({});

const sourceFile = program.getSourceFile(fileToParse)
let optionsInterface, mainExport

ts.forEachChild(sourceFile, node => {
  if (node.kind === ts.SyntaxKind.InterfaceDeclaration && node.symbol.escapedName === "ExampleOptions") {
      optionsInterface = node
  }

  if (node.kind === ts.SyntaxKind.FunctionDeclaration && node.symbol.escapedName === "twoslasher") {
    mainExport = node
    mainExport.body = null
  }
});

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const twoslasher = printer.printNode(ts.EmitHint.Unspecified, mainExport, sourceFile);
const optionsObj = printer.printNode(ts.EmitHint.Unspecified, optionsInterface, sourceFile);


console.log(twoslasher)
console.log(optionsObj)
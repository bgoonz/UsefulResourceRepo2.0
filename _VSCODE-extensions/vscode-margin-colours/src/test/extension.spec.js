/* eslint-env mocha */
/* eslint-disable no-unused-expressions, global-require */

const mockery = require("mockery");
const sinon = require("sinon");
const { expect } = require("chai");
const { supportedFileTypes } = require("../constants");

describe("margin-colours", () => {
  let marginColours;

  let vscodeMock;
  let changeTextEditorSpy;
  let createDecorationSpy;
  let setDecorationsSpy;
  let writeFileSpy;
  let lineAtFake;
  let disposeSpy;

  before(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
    });
  });

  after(() => {
    mockery.disable();
  });

  beforeEach(() => {
    disposeSpy = sinon.spy();
    vscodeMock = {
      Range: sinon.fake((start, end) => ({ start, end })),
      Position: sinon.fake((line, character) => ({ line, character })),
      window: {
        activeTextEditor: {
          document: {
            fileName: "my-file.js",
            lineCount: 1,
            lineAt: (lineAtFake = sinon.fake(() => ({
              text: "myColour: #123456",
            }))),
          },
          setDecorations: (setDecorationsSpy = sinon.spy()),
        },
        onDidChangeTextEditorSelection: (changeTextEditorSpy = sinon.spy()),
        createTextEditorDecorationType: (createDecorationSpy =
          sinon.fake.returns({ dispose: disposeSpy })),
      },
    };
  });

  afterEach(() => {
    mockery.deregisterAll();
  });

  function activateExtension() {
    // make sure extension is loaded with new mocks each time, bypassing
    // node's module caching
    mockery.registerAllowable("../extension", true);
    mockery.registerMock("vscode", vscodeMock);
    mockery.registerMock("fs", { writeFileSync: (writeFileSpy = sinon.spy()) });
    marginColours = require("../extension");
    marginColours.activate();
  }

  function setFileContent(lines) {
    const { document } = vscodeMock.window.activeTextEditor;
    document.lineCount = lines.length;
    let callCount = 0;
    lineAtFake = () => ({ text: lines[callCount++] });
    document.lineAt = lineAtFake;
  }

  function checkColourImageOnLine(callIdx, colour, line) {
    const svgFile = createDecorationSpy.getCall(callIdx).args[0].gutterIconPath;
    expect(svgFile).to.contain(`colour-${colour}.svg`);
    const lineNumber = setDecorationsSpy.getCall(callIdx).args[1][0].start.line;
    expect(lineNumber).to.equal(line);
  }

  describe("activate", () => {
    it("adds margin colours to active editor's file", () => {
      activateExtension();
      expect(setDecorationsSpy).to.have.been.called;
    });

    it("generates one svg file for each unique colour", () => {
      setFileContent(["#000", "#aaa", "#fff", "#cf654a"]);
      activateExtension();
      expect(writeFileSpy).to.have.callCount(4);
    });

    it("adds svg image to lines with a colour string", () => {
      const colours = [
        { colour: "#000", line: 0 },
        { colour: "#fff", line: 2 },
        { colour: "#cf654a", line: 4 },
      ];
      const lines = [
        `color: ${colours[0].colour};`,
        "font-size: 14px;",
        `background-color: ${colours[1].colour};`,
        "font-weight: bold;",
        `border: 1px solid ${colours[2].colour};`,
      ];
      setFileContent(lines);
      activateExtension();

      expect(setDecorationsSpy).to.have.callCount(3);
      colours.forEach((colour, idx) => {
        checkColourImageOnLine(idx, colour.colour, colour.line);
      });
    });

    it("uses first colour if a line contains two colour strings", () => {
      const lines = ["color: #33aa88; background: #444"];
      setFileContent(lines);
      activateExtension();

      expect(setDecorationsSpy).to.have.callCount(1);
      checkColourImageOnLine(0, "#33aa88", 0);
    });

    it("finds hex colours of all formats", () => {
      const colours = [
        "#000",
        "#fff",
        "#AAA",
        "#a43",
        "#43E",
        "#aa44dd",
        "#EE44AA",
        "#44aed3",
      ];
      setFileContent(colours);
      activateExtension();

      colours.forEach((colour, idx) => {
        checkColourImageOnLine(idx, colour, idx);
      });
    });

    it("finds rgb colours of all formats", () => {
      const colours = [
        "rgb(0, 0, 0)",
        "rgb( 40, 50, 100 )",
        "rgb(255, 132, 32 )",
        "rgb( 21, 200, 255)",
      ];
      setFileContent(colours);
      activateExtension();

      colours.forEach((colour, idx) => {
        checkColourImageOnLine(idx, colour, idx);
      });
    });

    it("finds rgba colours of all formats", () => {
      const colours = [
        "rgba(0, 0, 0, 0)",
        "rgba(0, 0, 0, 1)",
        "rgba(0, 0, 0, 0.5)",
        "rgba(0, 0, 0, .7)",
        "rgba( 40, 50, 100, .33 )",
        "rgba(255, 132, 32, .6 )",
        "rgba( 21, 200, 255, .75)",
      ];
      setFileContent(colours);
      activateExtension();

      colours.forEach((colour, idx) => {
        checkColourImageOnLine(idx, colour, idx);
      });
    });

    it("finds hsl colours of all formats", () => {
      const colours = [
        "hsl(180, 100%, 100%)",
        "hsl(360, 50%, 10%)",
        "hsl( 270, 30%, 80% )",
        "hsl( 65, 54%, 100%)",
        "hsl(12, 33%, 79% )",
      ];
      setFileContent(colours);
      activateExtension();

      colours.forEach((colour, idx) => {
        checkColourImageOnLine(idx, colour, idx);
      });
    });

    it("finds hsla colours of all formats", () => {
      const colours = [
        "hsla(180, 100%, 100%, 0)",
        "hsla(180, 100%, 100%, 1)",
        "hsla(180, 100%, 100%, 0.5)",
        "hsla(180, 100%, 100%, .35)",
        "hsla(360, 50%, 10%, .5)",
        "hsla( 270, 30%, 80%, .33 )",
        "hsla( 65, 54%, 100%, .9)",
        "hsla(12, 33%, 79%, .1 )",
      ];
      setFileContent(colours);
      activateExtension();

      colours.forEach((colour, idx) => {
        checkColourImageOnLine(idx, colour, idx);
      });
    });
  });

  describe("on change text editor selection", () => {
    const newColours = [
      { colour: "#000", line: 0 },
      { colour: "#aed", line: 2 },
    ];

    beforeEach(() => {
      setFileContent([
        "color: #000;",
        "font-size: 14px;",
        "background-color: #fff;",
        "font-weight: bold;",
        "border: 1px solid #cfd234;",
      ]);
      activateExtension();
    });

    function changeSelection() {
      createDecorationSpy.resetHistory();
      setDecorationsSpy.resetHistory();
      setFileContent([
        `color: ${newColours[0].colour};`,
        "font-size: 14px;",
        `background-color: ${newColours[1].colour};`,
      ]);
      changeTextEditorSpy.getCall(0).args[0]();
    }

    function checkImagesRemoved() {
      changeSelection();
      expect(disposeSpy).to.have.callCount(3);
    }

    describe("and file extension is supported", () => {
      supportedFileTypes.forEach((fileType) =>
        describe(`${fileType} file`, () => {
          it("removes old colour images", () => {
            checkImagesRemoved();
          });

          it("recalculates colour images", () => {
            const { document } = vscodeMock.window.activeTextEditor;
            document.fileName = `my-file.${fileType}`;
            changeSelection();
            expect(createDecorationSpy).to.have.callCount(2);
            expect(setDecorationsSpy).to.have.callCount(2);
            newColours.forEach((colour, idx) => {
              checkColourImageOnLine(idx, colour.colour, colour.line);
            });
          });
        })
      );
    });

    describe("and file extension is not supported", () => {
      it("removes old colour images", () => {
        checkImagesRemoved();
      });

      it("does not recalculates colour images", () => {
        const { document } = vscodeMock.window.activeTextEditor;
        document.fileName = "my-file.sql";
        changeSelection();
        expect(createDecorationSpy).not.to.have.been.called;
        expect(setDecorationsSpy).not.to.have.been.called;
      });
    });
  });

  describe("deactivate", () => {
    beforeEach(() => {
      setFileContent([
        "color: #000;",
        "font-size: 14px;",
        "background-color: #fff;",
        "font-weight: bold;",
        "border: 1px solid #cfd234;",
      ]);
      activateExtension();

      disposeSpy.resetHistory();
      marginColours.deactivate();
    });

    it("removes old colour images from margin", () => {
      expect(disposeSpy).to.have.callCount(3);
    });
  });
});

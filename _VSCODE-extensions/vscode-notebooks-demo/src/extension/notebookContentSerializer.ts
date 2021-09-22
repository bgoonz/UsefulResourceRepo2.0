import * as vscode from "vscode";
import { TextDecoder, TextEncoder } from "util";

// Interfaces for the data we're saving to the Notebook file

interface RawNotebookData {
  cells: RawNotebookCell[];
}

interface RawNotebookCell {
  language: string; //  language code of cell
  value: string; //  code in cell
  kind: vscode.NotebookCellKind; //  code cell or markdown
  outputs: RawCellOutput[]; //  saved outputs from cell
}

interface RawCellOutput {
  mime: string; //  kind of output, which renderer
  value: any; //  data for output
}

export class TodoNotebookContentSerializer
  implements vscode.NotebookSerializer
{
  // contents from file to VS Code Notebook data
  public async dataToNotebook(data: Uint8Array): Promise<vscode.NotebookData> {
    var contents = new TextDecoder().decode(data); // convert to String to make JSON object

    // Read file contents

    let raw: RawNotebookData = { cells: [] };
    try {
      raw = <RawNotebookData>JSON.parse(contents);
    } catch {
      raw = { cells: [] };
    }

    if (raw.cells === undefined) {
      raw.cells = [];
    }

    // Create array of Notebook cells for the VS Code API from file contents
    const cells = raw.cells.map(
      (item) =>
        new vscode.NotebookCellData(
          item.kind,
          item.value,
          item.language,
          item.outputs
            ? [
                new vscode.NotebookCellOutput(
                  item.outputs.map(
                    (raw) =>
                      new vscode.NotebookCellOutputItem(raw.mime, raw.value)
                  )
                ),
              ]
            : [],
          new vscode.NotebookCellMetadata()
        )
    );

    // Pass read and formatted Notebook Data to VS Code to display Notebook with saved cells
    return new vscode.NotebookData(
      cells,
      new vscode.NotebookDocumentMetadata().with({
        cellHasExecutionOrder: true,
      })
    );
  }

  // VS Code Notebook data to a string to save to the Notebook file
  public async notebookToData(data: vscode.NotebookData): Promise<Uint8Array> {
    // function to take output renderer data to a format to save to the file
    function asRawOutput(cell: vscode.NotebookCellData): RawCellOutput[] {
      let result: RawCellOutput[] = [];
      for (let output of cell.outputs ?? []) {
        for (let item of output.outputs) {
          result.push({ mime: item.mime, value: item.value });
        }
      }
      return result;
    }

    // Map the Notebook data into the format we want to save the Notebook data as

    let contents: RawNotebookData = { cells: [] };

    for (const cell of data.cells) {
      contents.cells.push({
        kind: cell.kind,
        language: cell.language,
        value: cell.source,
        outputs: asRawOutput(cell),
      });
    }

    // Give a string of all the data to save and VS Code will handle the rest
    return new TextEncoder().encode(JSON.stringify(contents));
  }
}

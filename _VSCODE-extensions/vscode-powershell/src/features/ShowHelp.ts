/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import vscode = require("vscode");
import {
  LanguageClient,
  NotificationType,
  RequestType,
} from "vscode-languageclient";
import { IFeature } from "../feature";
import { Logger } from "../logging";

export const ShowHelpRequestType = new RequestType<string, void, void, void>(
  "powerShell/showHelp"
);

export class ShowHelpFeature implements IFeature {
  private command: vscode.Disposable;
  private deprecatedCommand: vscode.Disposable;
  private languageClient: LanguageClient;

  constructor(private log: Logger) {
    this.command = vscode.commands.registerCommand(
      "PowerShell.ShowHelp",
      () => {
        if (this.languageClient === undefined) {
          this.log.writeAndShowError(
            `<${ShowHelpFeature.name}>: ` +
              "Unable to instantiate; language client undefined."
          );
          return;
        }

        const editor = vscode.window.activeTextEditor;
        const selection = editor.selection;
        const doc = editor.document;
        const cwr = doc.getWordRangeAtPosition(selection.active);
        const text = doc.getText(cwr);

        this.languageClient.sendRequest(ShowHelpRequestType, text);
      }
    );

    this.deprecatedCommand = vscode.commands.registerCommand(
      "PowerShell.OnlineHelp",
      () => {
        const warnText =
          "PowerShell.OnlineHelp is being deprecated. Use PowerShell.ShowHelp instead.";
        vscode.window.showWarningMessage(warnText);
        vscode.commands.executeCommand("PowerShell.ShowHelp");
      }
    );
  }

  public dispose() {
    this.command.dispose();
    this.deprecatedCommand.dispose();
  }

  public setLanguageClient(languageclient: LanguageClient) {
    this.languageClient = languageclient;
  }
}

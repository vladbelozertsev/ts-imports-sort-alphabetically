import * as vscode from "vscode";
import { getImports } from "./get-imports";
import { sortImports } from "./sort-imports";
import { isSupportedLang } from "./utils/helpers";
import { getSortOnSave } from "./utils/options";

export function activate(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand("ts-imports-sort-alphabetically.sort", () => {
    try {
      const editor = vscode.window.activeTextEditor;
      const lang = isSupportedLang(editor?.document.languageId);
      const documentImports = getImports();
      if (!editor || !lang || !documentImports) return;
      const insert = sortImports(documentImports);
      editor.edit((TextEdit) => {
        TextEdit.replace(documentImports.range, insert);
      });
    } catch (err) {
      console.error(err);
    }
  });

  const onSave = vscode.workspace.onWillSaveTextDocument((e) => {
    const disable = e.document.getText().includes("disable-sort-imports");
    const isSupporedLang = isSupportedLang(e.document.languageId);
    const isSortOnSave = getSortOnSave();
    if (!isSupporedLang || !isSortOnSave || disable) return;
    e.waitUntil(
      new Promise<vscode.TextEdit[]>((resolve) => {
        try {
          const documentImports = getImports(e.document);
          if (!documentImports) return resolve([]);
          const insert = sortImports(documentImports);
          resolve([vscode.TextEdit.replace(documentImports.range, insert)]);
        } catch (err) {
          console.error(err);
          resolve([]);
        }
      })
    );
  });

  context.subscriptions.push(command, onSave);
}

export function deactivate() {}

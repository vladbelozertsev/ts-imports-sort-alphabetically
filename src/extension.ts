import * as vscode from "vscode";

import { getImports } from "./get-imports";
import { sortImports } from "./sort-imports";

export function activate(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand("ts-imports-sort-alphabetically.sort", () => {
    const editor = vscode.window.activeTextEditor;
    const documentImports = getImports();
    if (!editor || !documentImports) return;
    const sorted = sortImports(documentImports);
    editor.edit((TextEdit) => {
      const begin = editor?.document.getText().indexOf("import ");
      const rangeBeg = editor?.document.positionAt(begin);
      const rangeEnd = editor?.document.positionAt(documentImports.lastImport);
      const range = new vscode.Range(rangeBeg, rangeEnd);
      const { normal, normalLong, types, typesLong } = sorted;
      TextEdit.replace(range, `${types}${normal}${normalLong}${typesLong}`);
    });
  });

  const onSave = vscode.workspace.onWillSaveTextDocument((e) => {
    e.waitUntil(
      new Promise<vscode.TextEdit[]>((resolve) => {
        const documentImports = getImports(e.document);
        if (!documentImports) return resolve([]);
        const sorted = sortImports(documentImports);
        const begin = e.document.getText().indexOf("import ");
        const end = documentImports.lastImport;
        const range = new vscode.Range(e.document.positionAt(begin), e.document.positionAt(end));
        const insert = `${sorted.types}${sorted.normal}${sorted.normalLong}${sorted.typesLong}`;
        resolve([vscode.TextEdit.replace(range, insert)]);
      })
    );
  });

  context.subscriptions.push(command, onSave);
}

export function deactivate() {}

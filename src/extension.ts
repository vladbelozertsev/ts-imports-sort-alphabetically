import * as vscode from "vscode";
import { getImports } from "./get-imports";
import { sortImports } from "./sort-imports";
import { insertImports } from "./insert-imports";

export function activate(context: vscode.ExtensionContext) {
  const extFn = () => {
    const editor = vscode.window.activeTextEditor;
    const documentImports = getImports();
    if (!editor || !documentImports) return;
    const sorted = sortImports(documentImports);
    insertImports(sorted, documentImports.lastImport);
  };

  const disposable = vscode.commands.registerCommand("ts-imports-sort-alphabetically.sort", extFn);

  const asd = vscode.workspace.onWillSaveTextDocument((e) => {
    e.waitUntil(
      new Promise<vscode.TextEdit[]>((resolve, reject) => {
        const documentImports = getImports(e.document);
        if (!documentImports) return resolve([]);
        const sorted = sortImports(documentImports);
        const begin = e.document.getText().indexOf("import");
        const end = documentImports.lastImport;
        const range = new vscode.Range(e.document.positionAt(begin), e.document.positionAt(end));
        const insert = `${sorted.types}${sorted.normal}${sorted.normalLong}${sorted.typesLong}`;
        resolve([vscode.TextEdit.replace(range, insert)]);
      })
    );
    // extFn();
  });

  context.subscriptions.push(disposable, asd);
}

export function deactivate() {}

// vscode.workspace.onWillSaveTextDocument(() => {
// 	editor.edit((editBuilder) => {
// 		editBuilder.replace(
// 			new vscode.Range(
// 				editor?.document.positionAt(
// 					editor?.document.getText().indexOf("import")
// 				),
// 				editor?.document.positionAt(
// 					editor?.document.getText().indexOf(restDocument)
// 				)
// 			),
// 			"restDocument"
// 		);
// 	});
// });

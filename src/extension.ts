import * as vscode from "vscode";
import { getImports } from "./get-imports";
import { sortImports } from "./sort-imports";
import { insertImports } from "./insert-imports";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "ts-imports-sort-alphabetically.sort",
    () => {
      const editor = vscode.window.activeTextEditor;
      const documentImports = getImports();
      if (!editor || !documentImports) return;
      const sorted = sortImports(documentImports);
      insertImports(sorted, documentImports.restDocument);
    }
  );

  context.subscriptions.push(disposable);
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

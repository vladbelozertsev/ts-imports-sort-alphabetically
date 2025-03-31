import * as vscode from "vscode";
import { ImportsSorted } from "./types";

export const insertImports = (sorted: ImportsSorted, restDocument: string) => {
  const editor = vscode.window.activeTextEditor!;
  const begin = editor?.document.getText().indexOf("import");
  const end = editor?.document.getText().indexOf(restDocument);

  editor.edit((editBuilder) => {
    editBuilder.replace(
      new vscode.Range(
        editor?.document.positionAt(begin),
        editor?.document.positionAt(end)
      ),
      `${sorted.types}${sorted.normal}${sorted.normalLong}${sorted.typesLong}`
    );
  });
};

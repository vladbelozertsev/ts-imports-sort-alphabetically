import * as vscode from "vscode";
import { ImportsSorted } from "./types";

export const insertImports = (sorted: ImportsSorted, end: number) => {
  const { normal, normalLong, types, typesLong } = sorted;
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  editor.edit((editBuilder) => {
    const begin = editor?.document.getText().indexOf("import");
    const rangeBeg = editor?.document.positionAt(begin);
    const rangeEnd = editor?.document.positionAt(end);
    const range = new vscode.Range(rangeBeg, rangeEnd);
    editBuilder.replace(range, `${types}${normal}${normalLong}${typesLong}`);
  });
};

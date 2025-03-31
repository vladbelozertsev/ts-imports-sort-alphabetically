import * as vscode from "vscode";

export const getPosition = (
  string: string,
  subString: string,
  index: number
) => {
  return string.split(subString, index).join(subString).length;
};

export const getTabString = () => {
  if (!vscode.window.activeTextEditor) return "\t";
  if (!vscode.window.activeTextEditor.options.insertSpaces) return "\t";
  const tabSize = +(vscode.window.activeTextEditor.options.tabSize || 0);
  return new Array(tabSize + 1).join(" ");
};

export const withoutSpaces = (str: string) => {
  return str
    .replaceAll("type ", "type_$!$_")
    .replaceAll(" ", "")
    .replaceAll("_$!$_", " ");
};

// https://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string

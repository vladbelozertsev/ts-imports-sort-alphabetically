import { Range, TextDocument, window } from "vscode";

export const getRange = (arr: string[], document: TextDocument) => {
  const last = { i: arr[arr.length - 1], len: arr[arr.length - 1].length };
  const begin = document.getText().indexOf(arr[0]);
  const end = document.getText().lastIndexOf(last.i) + last.len;
  const rangeBeg = document.positionAt(begin);
  const rangeEnd = document.positionAt(end);
  return new Range(rangeBeg, rangeEnd);
};

export const getTabString = () => {
  if (!window.activeTextEditor) return "\t";
  if (!window.activeTextEditor.options.insertSpaces) return "\t";
  const tabSize = +(window.activeTextEditor.options.tabSize || 0);
  return new Array(tabSize + 1).join(" ");
};

export const isSupportedLang = (languageId?: string) => {
  const langs = ["javascript", "javascriptreact", "typescript", "typescriptreact"];
  return !languageId ? false : langs.includes(languageId);
};

import { Disposable, window } from "vscode";

let sortOnSaveDisposer: Disposable;

function isFileJavascript() {
  return (
    window.activeTextEditor?.document.languageId === "javascript" ||
    window.activeTextEditor?.document.languageId === "javascriptreact"
  );
}

function isFileTypescript() {
  return (
    window.activeTextEditor?.document.languageId === "typescript" ||
    window.activeTextEditor?.document.languageId === "typescriptreact"
  );
}

function configure() {
  if (shouldSortOnSave()) enableFileWatcher();
  else disableFileWatcher();
}

function enableFileWatcher() {
  if (!sortOnSaveDisposer) {
    sortOnSaveDisposer = workspace.onWillSaveTextDocument(sortOnSave);
  }
}

function disableFileWatcher() {
  if (sortOnSaveDisposer) {
    sortOnSaveDisposer.dispose();
    sortOnSaveDisposer = undefined;
  }
}

// this method is called when your extension is deactivated
export function deactivate() {
  disableFileWatcher();
}

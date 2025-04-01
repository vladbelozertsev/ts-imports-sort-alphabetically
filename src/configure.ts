import { Disposable, window } from "vscode";

let sortOnSaveDisposer: Disposable;

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

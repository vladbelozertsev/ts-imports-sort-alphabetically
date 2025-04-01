"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = deactivate;
let sortOnSaveDisposer;
function configure() {
    if (shouldSortOnSave())
        enableFileWatcher();
    else
        disableFileWatcher();
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
function deactivate() {
    disableFileWatcher();
}
//# sourceMappingURL=configure.js.map
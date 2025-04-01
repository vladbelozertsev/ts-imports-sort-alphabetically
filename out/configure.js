"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = deactivate;
const vscode_1 = require("vscode");
let sortOnSaveDisposer;
function isFileJavascript() {
    return (vscode_1.window.activeTextEditor?.document.languageId === "javascript" ||
        vscode_1.window.activeTextEditor?.document.languageId === "javascriptreact");
}
function isFileTypescript() {
    return (vscode_1.window.activeTextEditor?.document.languageId === "typescript" ||
        vscode_1.window.activeTextEditor?.document.languageId === "typescriptreact");
}
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
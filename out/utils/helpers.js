"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withoutSpaces = exports.isSupportedLang = exports.getTabString = exports.getRange = void 0;
const vscode_1 = require("vscode");
const getRange = (arr, document) => {
    const last = { i: arr[arr.length - 1], len: arr[arr.length - 1].length };
    const begin = document.getText().indexOf(arr[0]);
    const end = document.getText().lastIndexOf(last.i) + last.len;
    const rangeBeg = document.positionAt(begin);
    const rangeEnd = document.positionAt(end);
    return new vscode_1.Range(rangeBeg, rangeEnd);
};
exports.getRange = getRange;
const getTabString = () => {
    if (!vscode_1.window.activeTextEditor)
        return "\t";
    if (!vscode_1.window.activeTextEditor.options.insertSpaces)
        return "\t";
    const tabSize = +(vscode_1.window.activeTextEditor.options.tabSize || 0);
    return new Array(tabSize + 1).join(" ");
};
exports.getTabString = getTabString;
const isSupportedLang = (languageId) => {
    const langs = ["javascript", "javascriptreact", "typescript", "typescriptreact"];
    return langs.includes(languageId);
};
exports.isSupportedLang = isSupportedLang;
const withoutSpaces = (str) => {
    return str.replaceAll("type ", "type_$!$_").replaceAll(" ", "").replaceAll("_$!$_", " ");
};
exports.withoutSpaces = withoutSpaces;
//# sourceMappingURL=helpers.js.map
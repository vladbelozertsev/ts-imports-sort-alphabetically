"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSupportedLang = exports.getRange = exports.getFirstN = exports.withoutSpaces = exports.getTabString = exports.getPosition = void 0;
const vscode_1 = require("vscode");
const getPosition = (string, subString, index) => {
    return string.split(subString, index).join(subString).length;
};
exports.getPosition = getPosition;
const getTabString = () => {
    if (!vscode_1.window.activeTextEditor)
        return "\t";
    if (!vscode_1.window.activeTextEditor.options.insertSpaces)
        return "\t";
    const tabSize = +(vscode_1.window.activeTextEditor.options.tabSize || 0);
    return new Array(tabSize + 1).join(" ");
};
exports.getTabString = getTabString;
const withoutSpaces = (str) => {
    return str.replaceAll("type ", "type_$!$_").replaceAll(" ", "").replaceAll("_$!$_", " ");
};
exports.withoutSpaces = withoutSpaces;
const getFirstN = (str) => {
    if (!str?.length)
        return 0;
    let string = str;
    let count = 0;
    while (string.slice(0, 1) === "\n") {
        string = string.slice(1);
        count += 1;
    }
    return count;
};
exports.getFirstN = getFirstN;
const getRange = (arr, document) => {
    const last = { i: arr[arr.length - 1], len: arr[arr.length - 1].length };
    const begin = document.getText().indexOf(arr[0]);
    const end = document.getText().lastIndexOf(last.i) + last.len;
    const rangeBeg = document.positionAt(begin);
    const rangeEnd = document.positionAt(end);
    return new vscode_1.Range(rangeBeg, rangeEnd);
};
exports.getRange = getRange;
const isSupportedLang = (languageId) => {
    const langs = ["javascript", "javascriptreact", "typescript", "typescriptreact"];
    return langs.includes(languageId);
};
exports.isSupportedLang = isSupportedLang;
// https://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
//# sourceMappingURL=index.js.map
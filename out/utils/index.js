"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTSFile = exports.isJSFile = exports.getFirstN = exports.withoutSpaces = exports.getTabString = exports.getPosition = void 0;
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
const isJSFile = (pramLanguageId) => {
    const languageId = pramLanguageId || vscode_1.window.activeTextEditor?.document.languageId;
    return languageId === "javascript" || languageId === "javascriptreact";
};
exports.isJSFile = isJSFile;
const isTSFile = (pramLanguageId) => {
    const languageId = pramLanguageId || vscode_1.window.activeTextEditor?.document.languageId;
    return languageId === "typescript" || languageId === "typescriptreact";
};
exports.isTSFile = isTSFile;
// https://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
//# sourceMappingURL=index.js.map
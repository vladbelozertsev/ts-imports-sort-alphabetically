"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortOnSave = getSortOnSave;
exports.getPrintWidth = getPrintWidth;
exports.getImportsDevide = getImportsDevide;
exports.getTypesTop = getTypesTop;
const vscode_1 = require("vscode");
function getSortOnSave() {
    return config().get("sortOnSave");
}
function getPrintWidth() {
    return config().get("sortOnSave");
}
function getImportsDevide() {
    return config().get("importsDevide");
}
function getTypesTop() {
    return config().get("typesTop");
}
function config() {
    return vscode_1.workspace.getConfiguration("ts-imports-sort-alphabetically");
}
//# sourceMappingURL=options.js.map
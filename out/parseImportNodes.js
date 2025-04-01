"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importRegex = void 0;
exports.default = parseImportNodes;
const name = `((?!\\d)(?:(?!\\s)[$\\w\\u0080-\\uFFFF]|\\\\u[\\da-fA-F]{4}|\\\\u\\{[\\da-fA-F]+\\})+)`;
const ws = `[\\s\\n\\r]`;
const namespaceToken = `\\*\\s+as\\s+(${name})`;
const defaultImportToken = name;
const destructingImportToken = `(${name})(\\s+as\\s+(${name}))?`;
const destructingImport = `{(${ws}*${destructingImportToken}(,${ws}*${destructingImportToken})*${ws}*)}`;
const defaultAndDestructingImport = `${defaultImportToken}${ws}*,${ws}*${destructingImport}`;
const combinedImportTypes = `(${namespaceToken}|${defaultImportToken}|${destructingImport}|${defaultAndDestructingImport})`;
const importRegexString = `^(import|import type)\\s+(${combinedImportTypes}\\s+from\\s+)?['"]([@\\w\\\\/\.-]+)['"];?\\r?\\n?`;
exports.importRegex = new RegExp(importRegexString, "gm");
function parseImportNodes(document) {
    if (!document)
        return [];
    exports.importRegex.lastIndex = 0;
    let source = document.getText();
    let imports = [];
    let match;
    while ((match = exports.importRegex.exec(source))) {
        console.log("==============");
        console.log(match);
        console.log("==============");
        imports.push(match[0]);
    }
    return imports.filter((imp) => !!imp);
}
//# sourceMappingURL=parseImportNodes.js.map
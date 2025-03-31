"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentImports = getDocumentImports;
const vscode_1 = require("vscode");
const name = `((?!\\d)(?:(?!\\s)[$\\w\\u0080-\\uFFFF]|\\\\u[\\da-fA-F]{4}|\\\\u\\{[\\da-fA-F]+\\})+)`;
const ws = `[\\s\\n\\r]`;
const namespaceToken = `\\*\\s+as\\s+(${name})`;
const defaultImportToken = name;
const destructingImportToken = `(${name})(\\s+as\\s+(${name}))?`;
const destructingImport = `{(${ws}*${destructingImportToken}(,${ws}*${destructingImportToken})*${ws}*)}`;
const defaultAndDestructingImport = `${defaultImportToken}${ws}*,${ws}*${destructingImport}`;
const combinedImportTypes = `(${namespaceToken}|${defaultImportToken}|${destructingImport}|${defaultAndDestructingImport})`;
const importRegexString = `^(import|import type)\\s+(${combinedImportTypes}\\s+from\\s+)?['"]([@\\w\\\\/\.-]+)['"];?\\r?\\n?`;
// Group 6 || Group 19 - default import
// Group 4 - namespace import
// Group 7 || Group 20 - destructing import group; requires further tokenizing
// Group 32 - file path or package
const importRegex = new RegExp(importRegexString, "gm");
// Group 2 - importName
// Group 5 - alias
const destructingImportTokenRegex = new RegExp(destructingImportToken);
function getDocumentImports(document) {
    const source = document.getText();
    importRegex.lastIndex = 0;
    const imports = [];
    let match;
    while ((match = importRegex.exec(source))) {
        imports.push({
            path: match[32],
            default: match[6] || match[19],
            namedImports: parseDestructiveImports(match[7] || match[20]),
            namespace: match[4],
            range: new vscode_1.Range(document.positionAt(match.index), document.positionAt(importRegex.lastIndex)),
        });
    }
    return imports;
}
function parseDestructiveImports(destructiveImports) {
    if (!destructiveImports)
        return [];
    return destructiveImports
        .split(",")
        .map((destructiveImport) => {
        let match = destructingImportTokenRegex.exec(destructiveImport);
        if (match)
            return { importName: match[1], alias: match[4] };
    })
        .filter((item) => !!item);
}
//# sourceMappingURL=get-document-imports.js.map
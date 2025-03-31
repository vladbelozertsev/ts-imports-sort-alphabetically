"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImport = exports.getImports = void 0;
const utils_1 = require("./utils");
const vscode_1 = require("vscode");
const getImports = (pramDoc) => {
    const document = pramDoc || vscode_1.window.activeTextEditor?.document;
    const imports = document?.getText().split("import ");
    if (!imports?.length)
        return null;
    let lastImport = 0;
    const mapped = imports.slice(1).map((item, index) => {
        if (index !== imports.length - 2)
            return (0, exports.getImport)(item);
        const singleQuote = (0, utils_1.getPosition)(item, "'", 2) + 1;
        const doubleQuote = (0, utils_1.getPosition)(item, '"', 2) + 1;
        const closestChar = Math.min(singleQuote, doubleQuote);
        const semicolon = item[closestChar] === ";" ? 1 : 0;
        const cutted = item.slice(0, closestChar + semicolon);
        const breaks = (0, utils_1.getFirstN)(item.slice(closestChar + semicolon));
        lastImport = document.getText().lastIndexOf(cutted) + cutted.length + breaks; // если кроме импортов пусто?
        return (0, exports.getImport)(cutted);
    });
    return mapped.reduce((acc, cur) => {
        const value = `import ${cur}`.trim();
        const isType = cur.startsWith("type") || cur.startsWith(" type");
        const part = isType ? "types" : "normal";
        const long = value.length > 120 ? "Long" : "";
        return { ...acc, [`${part}${long}`]: [...acc[`${part}${long}`], value] };
    }, {
        normal: [],
        normalLong: [],
        types: [],
        typesLong: [],
        lastImport,
    });
};
exports.getImports = getImports;
const getImport = (item) => {
    const clear = item.replaceAll("\n", "").trim();
    const regex = new RegExp(/(?<={)[^]*?(?=})/, "g");
    const namedImports = clear.match(regex);
    if (!namedImports)
        return clear;
    return clear.replace(regex, ` ${(0, utils_1.withoutSpaces)(namedImports[0])
        .split(",")
        .filter((txt) => !!txt.trim())
        .sort()
        .join(", ")} `);
};
exports.getImport = getImport;
//# sourceMappingURL=get-imports.js.map
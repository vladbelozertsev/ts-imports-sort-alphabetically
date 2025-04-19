"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImports = void 0;
const vscode_1 = require("vscode");
const options_1 = require("./utils/options");
const helpers_1 = require("./utils/helpers");
const parse_import_nodes_1 = require("./utils/parse-import-nodes");
const getImports = (pramDoc) => {
    const document = pramDoc || vscode_1.window.activeTextEditor?.document;
    const imports = (0, parse_import_nodes_1.parseImportNodes)(document);
    if (!imports?.length)
        return null;
    const space = (0, options_1.getSpacing)() ? " " : "";
    const printWidth = (0, options_1.getPrintWidth)();
    const mapped = imports.map((item) => {
        const clear = item.replaceAll("\n", "").trim();
        const regex = new RegExp(/(?<={)[^]*?(?=})/, "g");
        const namedImports = clear.match(regex);
        if (!namedImports)
            return clear;
        return clear.replace(regex, `${space}${namedImports[0]
            .split(",")
            .map((item) => item.trim())
            .filter((txt) => !!txt)
            .sort()
            .join(", ")}${space}`);
    });
    return mapped.reduce((acc, cur) => {
        const value = cur.trim();
        const isType = cur.startsWith("import type");
        const part = isType ? "types" : "normal";
        const long = value.length >= printWidth ? "Long" : "";
        return { ...acc, [`${part}${long}`]: [...acc[`${part}${long}`], value] };
    }, {
        range: (0, helpers_1.getRange)(imports, document),
        normal: [],
        normalLong: [],
        types: [],
        typesLong: [],
    });
};
exports.getImports = getImports;
//# sourceMappingURL=get-imports.js.map
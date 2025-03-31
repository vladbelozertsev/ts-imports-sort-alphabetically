"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortImports = void 0;
const utils_1 = require("./utils");
const sortImports = (imports) => {
    const nlBreak = !!imports.normalLong?.length ? "\n\n" : "";
    const tlBreak = !!imports.typesLong?.length ? "\n\n" : "";
    const nBreak = !!imports.normal?.length ? "\n\n" : "";
    return {
        normal: nBreak + imports.normal.sort().join("\n"),
        types: imports.types.sort().join("\n"),
        normalLong: nlBreak + imports.normalLong.map(getImport).join("\n\n"),
        typesLong: tlBreak + imports.typesLong.map(getImport).join("\n\n"),
    };
};
exports.sortImports = sortImports;
const getImport = (item) => {
    const regex = new RegExp(/(?<={)[^]*?(?=})/, "g");
    const namedImports = item.match(regex);
    if (!namedImports)
        return item;
    const namedSorted = namedImports[0]
        .split(",")
        .filter((txt) => !!txt)
        .map((txt) => `${(0, utils_1.getTabString)()}${(0, utils_1.withoutSpaces)(txt)}`)
        .join(",\n");
    return item.replace(regex, `\n${namedSorted},\n`);
};
//# sourceMappingURL=sort-imports.js.map
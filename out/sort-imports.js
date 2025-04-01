"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortImports = void 0;
const utils_1 = require("./utils");
const sortImports = (imports) => {
    const nBreak = !!imports.normal?.length ? "\n\n" : "";
    const tBreak = !!imports.types?.length ? "\n\n" : "";
    const nlBreak = !!imports.normalLong?.length ? "\n\n" : "";
    const tlBreak = !!imports.typesLong?.length ? "\n\n" : "";
    return {
        types: imports.types.sort().join("\n") + tBreak,
        normal: imports.normal.sort().join("\n") + nBreak,
        normalLong: imports.normalLong.map(getImport).join("\n\n") + nlBreak,
        typesLong: imports.typesLong.map(getImport).join("\n\n") + tlBreak,
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
    return item.replace(regex, `\n${namedSorted}\n`);
};
//# sourceMappingURL=sort-imports.js.map
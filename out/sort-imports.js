"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortImports = void 0;
const options_1 = require("./utils/options");
const helpers_1 = require("./utils/helpers");
const sortImports = (imports) => {
    const first = (0, options_1.getTypesTop)() ? imports.types : imports.normal;
    const second = (0, options_1.getTypesTop)() ? imports.normal : imports.types;
    const devide = (0, options_1.getImportsDevide)();
    const isNL = !!imports.normalLong?.length;
    const isTL = !!imports.typesLong?.length;
    const isF = !!first?.length;
    const isS = !!second?.length;
    const fBreak = (isF && isS && devide) || (isF && !isS && (isNL || isTL)) ? "\n\n" : isF ? "\n" : "";
    const sBreak = isS && (isNL || isTL) ? "\n\n" : isS ? "\n" : "";
    const nlBreak = isNL && isTL ? "\n\n" : isNL ? "\n" : "";
    const tlBreak = isTL ? "\n" : "";
    return [
        first.sort().join("\n") + fBreak,
        second.sort().join("\n") + sBreak,
        imports.normalLong.map(getImport).join("\n\n") + nlBreak,
        imports.typesLong.map(getImport).join("\n\n") + tlBreak,
    ].join("");
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
        .map((txt) => `${(0, helpers_1.getTabString)()}${(0, helpers_1.withoutSpaces)(txt)}`)
        .join(",\n");
    return item.replace(regex, `\n${namedSorted}\n`);
};
//# sourceMappingURL=sort-imports.js.map
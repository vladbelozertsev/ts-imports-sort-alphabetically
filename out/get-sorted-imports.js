"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortedImports = void 0;
const getSortedImports = (imports) => {
    documentImports.forEach((imp) => {
        imp.namedImports?.sort();
    });
    documentImports.map((imp) => {
        const name = `import ${imp.namespace}`;
    });
    // return documentImports.sort((a, b) => {
    //   const namea = a.
    // });
};
exports.getSortedImports = getSortedImports;
//# sourceMappingURL=get-sorted-imports.js.map
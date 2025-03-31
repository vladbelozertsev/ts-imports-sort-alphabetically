"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const get_imports_1 = require("./get-imports");
const sort_imports_1 = require("./sort-imports");
const insert_imports_1 = require("./insert-imports");
function activate(context) {
    const extFn = () => {
        const editor = vscode.window.activeTextEditor;
        const documentImports = (0, get_imports_1.getImports)();
        if (!editor || !documentImports)
            return;
        const sorted = (0, sort_imports_1.sortImports)(documentImports);
        (0, insert_imports_1.insertImports)(sorted, documentImports.lastImport);
    };
    const disposable = vscode.commands.registerCommand("ts-imports-sort-alphabetically.sort", extFn);
    const asd = vscode.workspace.onWillSaveTextDocument((e) => {
        e.waitUntil(new Promise((resolve, reject) => {
            const documentImports = (0, get_imports_1.getImports)(e.document);
            if (!documentImports)
                return resolve([]);
            const sorted = (0, sort_imports_1.sortImports)(documentImports);
            const begin = e.document.getText().indexOf("import");
            const end = documentImports.lastImport;
            const range = new vscode.Range(e.document.positionAt(begin), e.document.positionAt(end));
            const insert = `${sorted.types}${sorted.normal}${sorted.normalLong}${sorted.typesLong}`;
            resolve([vscode.TextEdit.replace(range, insert)]);
        }));
        // extFn();
    });
    context.subscriptions.push(disposable, asd);
}
function deactivate() { }
// vscode.workspace.onWillSaveTextDocument(() => {
// 	editor.edit((editBuilder) => {
// 		editBuilder.replace(
// 			new vscode.Range(
// 				editor?.document.positionAt(
// 					editor?.document.getText().indexOf("import")
// 				),
// 				editor?.document.positionAt(
// 					editor?.document.getText().indexOf(restDocument)
// 				)
// 			),
// 			"restDocument"
// 		);
// 	});
// });
//# sourceMappingURL=extension.js.map
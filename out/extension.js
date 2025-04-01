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
const helpers_1 = require("./utils/helpers");
const options_1 = require("./utils/options");
function activate(context) {
    const command = vscode.commands.registerCommand("ts-imports-sort-alphabetically.sort", () => {
        try {
            const editor = vscode.window.activeTextEditor;
            const lang = (0, helpers_1.isSupportedLang)(editor?.document.languageId);
            const documentImports = (0, get_imports_1.getImports)();
            if (!editor || !lang || !documentImports)
                return;
            const insert = (0, sort_imports_1.sortImports)(documentImports);
            editor.edit((TextEdit) => {
                TextEdit.replace(documentImports.range, insert);
            });
        }
        catch (err) {
            console.error(err);
        }
    });
    const onSave = vscode.workspace.onWillSaveTextDocument((e) => {
        const disable = e.document.getText().includes("disable-sort-imports");
        const isSupporedLang = (0, helpers_1.isSupportedLang)(e.document.languageId);
        const isSortOnSave = (0, options_1.getSortOnSave)();
        if (!isSupporedLang || !isSortOnSave || disable)
            return;
        e.waitUntil(new Promise((resolve) => {
            try {
                const documentImports = (0, get_imports_1.getImports)(e.document);
                if (!documentImports)
                    return resolve([]);
                const insert = (0, sort_imports_1.sortImports)(documentImports);
                resolve([vscode.TextEdit.replace(documentImports.range, insert)]);
            }
            catch (err) {
                console.error(err);
                resolve([]);
            }
        }));
    });
    context.subscriptions.push(command, onSave);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map
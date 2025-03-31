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
exports.withoutSpaces = exports.getTabString = exports.getPosition = void 0;
const vscode = __importStar(require("vscode"));
const getPosition = (string, subString, index) => {
    return string.split(subString, index).join(subString).length;
};
exports.getPosition = getPosition;
const getTabString = () => {
    if (!vscode.window.activeTextEditor)
        return "\t";
    if (!vscode.window.activeTextEditor.options.insertSpaces)
        return "\t";
    const tabSize = +(vscode.window.activeTextEditor.options.tabSize || 0);
    return new Array(tabSize + 1).join(" ");
};
exports.getTabString = getTabString;
const withoutSpaces = (str) => {
    return str
        .replaceAll("type ", "type_$!$_")
        .replaceAll(" ", "")
        .replaceAll("_$!$_", " ");
};
exports.withoutSpaces = withoutSpaces;
// https://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
//# sourceMappingURL=index.js.map
import { TextDocument } from "vscode";

const name = `((?!\\d)(?:(?!\\s)[$\\w\\u0080-\\uFFFF]|\\\\u[\\da-fA-F]{4}|\\\\u\\{[\\da-fA-F]+\\})+)`;
const ws = `[\\s\\n\\r]`;

const namespaceToken = `\\*\\s+as\\s+(${name})`;
const defaultImportToken = name;
const destructingImportToken = `((type\\s+)?${name})(\\s+as\\s+((type\\s+)?${name}))?`;
const destructingImport = `{(${ws}*${destructingImportToken}(,${ws}*${destructingImportToken},?)*${ws}*)}`;
const defaultAndDestructingImport = `${defaultImportToken}${ws}*,${ws}*${destructingImport}`;
const combinedImportTypes = `(${namespaceToken}|${defaultImportToken}|${destructingImport}|${defaultAndDestructingImport})`;
const importRegexString = `^(import|import\\s+type)\\s+(${combinedImportTypes}\\s+from\\s+)?['"]([@\\w\\\\/\.-]+)['"];?\\r?\\n?`;

export const importRegex = new RegExp(importRegexString, "gm");

export function parseImportNodes(document?: TextDocument) {
  if (!document) return [];
  importRegex.lastIndex = 0;
  let source = document.getText();
  let imports: (string | null)[] = [];
  let match;
  while ((match = importRegex.exec(source))) imports.push(match[0]);
  return imports.filter((imp) => !!imp) as string[];
}

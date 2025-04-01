import { workspace } from "vscode";

export function getSortOnSave(): boolean {
  return config().get("sortOnSave") as boolean;
}

export function getPrintWidth(): number {
  return config().get("sortOnSave") as number;
}

export function getImportsDevide(): boolean {
  return config().get("importsDevide") as boolean;
}

export function getTypesTop(): boolean {
  return config().get("typesTop") as boolean;
}

function config() {
  return workspace.getConfiguration("ts-imports-sort-alphabetically");
}

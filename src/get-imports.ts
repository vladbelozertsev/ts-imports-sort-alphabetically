import { Imports } from "./types";
import { getPosition, withoutSpaces } from "./utils";
import { window } from "vscode";

export const getImports = () => {
  const editor = window.activeTextEditor;
  const imports = editor?.document.getText().split("import ");
  if (!imports?.length) return null;
  let restDocument = "";

  const mapped = imports.slice(1).map((item, index) => {
    if (index !== imports.length - 2) return getImport(item);
    const singleQuote = getPosition(item, "'", 2) + 1;
    const doubleQuote = getPosition(item, '"', 2) + 1;
    const closestChar = Math.min(singleQuote, doubleQuote);
    const semicolon = item[closestChar] === ";" ? 1 : 0;
    restDocument = item.slice(closestChar + semicolon);
    return getImport(item.slice(0, closestChar + semicolon));
  });

  return mapped.reduce(
    (acc, cur) => {
      const value = `import ${cur}`.trim();
      const isType = cur.startsWith("type") || cur.startsWith(" type");
      const part = isType ? "types" : "normal";
      const long = value.length > 120 ? "Long" : "";
      return { ...acc, [`${part}${long}`]: [...acc[`${part}${long}`], value] };
    },
    {
      normal: [],
      normalLong: [],
      types: [],
      typesLong: [],
      restDocument,
    } as Imports
  );
};

export const getImport = (item: string) => {
  const clear = item.replaceAll("\n", "").trim();
  const regex = new RegExp(/(?<={)[^]*?(?=})/, "g");
  const namedImports = clear.match(regex);
  if (!namedImports) return clear;

  return clear.replace(
    regex,
    ` ${withoutSpaces(namedImports[0])
      .split(",")
      .filter((txt) => !!txt.trim())
      .sort()
      .join(", ")} `
  );
};

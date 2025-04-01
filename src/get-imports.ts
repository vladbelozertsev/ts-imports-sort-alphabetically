import parseImportNodes from "./parseImportNodes";
import { getFirstN, getPosition, withoutSpaces } from "./utils";
import { Imports } from "./types";
import { TextDocument, window } from "vscode";

export const getImports = (pramDoc?: TextDocument) => {
  const document = pramDoc || window.activeTextEditor?.document;
  const imports = parseImportNodes(document);
  if (!imports?.length) return null;
  let insertBeg = 0;
  let insertEnd = 0;
  let lastImport = 0;

  console.log(imports);

  const mapped = imports.map((item, index) => {
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

    return getImport(item);
    const singleQuote = getPosition(item, "'", 2) + 1;
    const doubleQuote = getPosition(item, '"', 2) + 1;
    const closestChar = Math.min(singleQuote, doubleQuote);
    const semicolon = item[closestChar] === ";" ? 1 : 0;
    const cutted = item.slice(0, closestChar + semicolon);
    const breaks = getFirstN(item.slice(closestChar + semicolon));
    lastImport = document!.getText().lastIndexOf(cutted) + cutted.length + breaks; // если кроме импортов пусто?
    return getImport(cutted);
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
      lastImport,
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

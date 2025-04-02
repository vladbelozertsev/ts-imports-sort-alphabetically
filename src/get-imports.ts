import { Imports } from "./types";
import { TextDocument, window } from "vscode";
import { getPrintWidth, getSpacing } from "./utils/options";
import { getRange, withoutSpaces } from "./utils/helpers";
import { parseImportNodes } from "./utils/parse-import-nodes";

export const getImports = (pramDoc?: TextDocument) => {
  const document = pramDoc || window.activeTextEditor?.document;
  const imports = parseImportNodes(document);
  if (!imports?.length) return null;
  const space = getSpacing() ? " " : "";
  const printWidth = getPrintWidth();

  const mapped = imports.map((item) => {
    const clear = item.replaceAll("\n", "").trim();
    const regex = new RegExp(/(?<={)[^]*?(?=})/, "g");
    const namedImports = clear.match(regex);
    if (!namedImports) return clear;

    return clear.replace(
      regex,
      `${space}${withoutSpaces(namedImports[0])
        .split(",")
        .filter((txt) => !!txt)
        .sort()
        .join(", ")}${space}`
    );
  });

  return mapped.reduce(
    (acc, cur) => {
      const value = cur.trim();
      const isType = cur.startsWith("import type");
      const part = isType ? "types" : "normal";
      const long = value.length >= printWidth ? "Long" : "";
      return { ...acc, [`${part}${long}`]: [...acc[`${part}${long}`], value] };
    },
    {
      range: getRange(imports, document!),
      normal: [],
      normalLong: [],
      types: [],
      typesLong: [],
    } as Imports
  );
};

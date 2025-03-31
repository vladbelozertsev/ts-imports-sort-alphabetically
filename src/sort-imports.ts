import { Imports, ImportsSorted } from "./types";
import { getTabString, withoutSpaces } from "./utils";

export const sortImports = (imports: Imports): ImportsSorted => {
  const nlBreak = !!imports.normalLong?.length ? "\n\n" : "";
  const tlBreak = !!imports.typesLong?.length ? "\n\n" : "";
  const nBreak = !!imports.normal?.length ? "\n\n" : "";

  return {
    normal: nBreak + imports.normal.sort().join("\n"),
    types: imports.types.sort().join("\n"),
    normalLong: nlBreak + imports.normalLong.map(getImport).join("\n\n"),
    typesLong: tlBreak + imports.typesLong.map(getImport).join("\n\n"),
  };
};

const getImport = (item: string) => {
  const regex = new RegExp(/(?<={)[^]*?(?=})/, "g");
  const namedImports = item.match(regex);
  if (!namedImports) return item;
  const namedSorted = namedImports[0]
    .split(",")
    .filter((txt) => !!txt)
    .map((txt) => `${getTabString()}${withoutSpaces(txt)}`)
    .join(",\n");
  return item.replace(regex, `\n${namedSorted},\n`);
};

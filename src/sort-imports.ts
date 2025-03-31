import { Imports, ImportsSorted } from "./types";
import { getTabString, withoutSpaces } from "./utils";

export const sortImports = (imports: Imports): ImportsSorted => {
  const nBreak = !!imports.normal?.length ? "\n\n" : "";
  const tBreak = !!imports.types?.length ? "\n\n" : "";
  const nlBreak = !!imports.normalLong?.length ? "\n\n" : "";
  const tlBreak = !!imports.typesLong?.length ? "\n\n" : "";

  return {
    types: imports.types.sort().join("\n") + tBreak,
    normal: imports.normal.sort().join("\n") + nBreak,
    normalLong: imports.normalLong.map(getImport).join("\n") + nlBreak,
    typesLong: imports.typesLong.map(getImport).join("\n") + tlBreak,
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

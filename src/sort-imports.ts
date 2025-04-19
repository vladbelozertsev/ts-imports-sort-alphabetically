import { Imports } from "./types";
import { getImportsDevide, getTypesTop } from "./utils/options";
import { getTabString } from "./utils/helpers";

export const sortImports = (imports: Imports): string => {
  const first = getTypesTop() ? imports.types : imports.normal;
  const second = getTypesTop() ? imports.normal : imports.types;
  const devide = getImportsDevide();

  const isNL = !!imports.normalLong?.length;
  const isTL = !!imports.typesLong?.length;
  const isF = !!first?.length;
  const isS = !!second?.length;

  const fBreak = (isF && isS && devide) || (isF && !isS && (isNL || isTL)) ? "\n\n" : isF ? "\n" : "";
  const sBreak = isS && (isNL || isTL) ? "\n\n" : isS ? "\n" : "";
  const nlBreak = isNL && isTL ? "\n\n" : isNL ? "\n" : "";
  const tlBreak = isTL ? "\n" : "";

  return [
    first.sort().join("\n") + fBreak,
    second.sort().join("\n") + sBreak,
    imports.normalLong.map(getImport).join("\n\n") + nlBreak,
    imports.typesLong.map(getImport).join("\n\n") + tlBreak,
  ].join("");
};

const getImport = (item: string) => {
  const regex = new RegExp(/(?<={)[^]*?(?=})/, "g");
  const namedImports = item.match(regex);
  if (!namedImports) return item;
  const namedSorted = namedImports[0]
    .split(",")
    .filter((txt) => !!txt.trim())
    .map((txt) => `${getTabString()}${txt.trim()}`)
    .join(",\n");
  return item.replace(regex, `\n${namedSorted}\n`);
};

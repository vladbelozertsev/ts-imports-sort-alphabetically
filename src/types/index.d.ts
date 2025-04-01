import { Range } from "vscode";

export type Imports = {
  normal: string[];
  normalLong: string[];
  types: string[];
  typesLong: string[];
  range: Range;
};

export type ImportsSorted = {
  normal: string;
  types: string;
  normalLong: string;
  typesLong: string;
};

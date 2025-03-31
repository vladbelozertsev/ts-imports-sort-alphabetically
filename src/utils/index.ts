import { window } from "vscode";

export const getPosition = (string: string, subString: string, index: number) => {
  return string.split(subString, index).join(subString).length;
};

export const getTabString = () => {
  if (!window.activeTextEditor) return "\t";
  if (!window.activeTextEditor.options.insertSpaces) return "\t";
  const tabSize = +(window.activeTextEditor.options.tabSize || 0);
  return new Array(tabSize + 1).join(" ");
};

export const withoutSpaces = (str: string) => {
  return str.replaceAll("type ", "type_$!$_").replaceAll(" ", "").replaceAll("_$!$_", " ");
};

export const getFirstN = (str: string) => {
  if (!str?.length) return 0;
  let string = str;
  let count = 0;
  while (string.slice(0, 1) === "\n") {
    string = string.slice(1);
    count += 1;
  }
  return count;
};

// https://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string

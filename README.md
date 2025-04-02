## About

Extension for sorting TS/JS imports alphabetically, like you sort them by ["Sort lines"](https://marketplace.visualstudio.com/items?itemName=Tyriar.sort-lines) extension. Extension works for `js/ts` and `jsx/tsx` type of files. Extension sort imports in both directions: horizontal and vertical.

## Usage: command

Press "Ctrl+Shift+P" and tap:\
`"Sort TS imports"`

## Usage: auto

Add to your settings.json file:\
`ts-imports-sort-alphabetically.sortOnSave": true`

## Caution

Extension edit your imports and remove code between `import ...` statements. It means comments or code will be removed.\
For example:\
`import { A } from "./a"; // some comment` \
`const foo = "bar";`\
`import { B } from "./b";`\
Extension will remove `//some comment` and `const foo = "bar";` strings.

## Disable

You can disable auto sorting for some files, by adding this comment to document:\
`disable-sort-imports`

## Options

`ts-imports-sort-alphabetically.sortOnSave` - Boolean, default: `true`. Sort imports before file will be saved.

`ts-imports-sort-alphabetically.printWidth` - Number, default: `120`. Prittier-like print width. Max width for single lined import. If bigger, it will be breaked into few lines.

## Examples:

![example-image](https://github.com/vladbelozertsev/dim-theme/blob/master/images/example.png?raw=true)

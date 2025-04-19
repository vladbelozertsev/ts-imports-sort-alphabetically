## About

I didn't found similar extension, so i decide to create my own. Extension for sorting TS/JS imports alphabetically, like you sort them by ["Sort lines"](https://marketplace.visualstudio.com/items?itemName=Tyriar.sort-lines) extension. Extension works for `js/ts` and `jsx/tsx` type of files. Extension sort imports in both directions: horizontal and vertical.

## Usage: command

Press "Ctrl+Shift+P" and tap:\
`"Sort TS imports"`

## Usage: auto

Add to your settings.json file:\
`ts-imports-sort-alphabetically.sortOnSave": true`

## Caution

Extension edit your imports and remove all non-import strings between `import ...` statements. It means comments or code will be removed.\
For example:\
`import { A } from "./a"; // some comment` \
`const foo = "bar";`\
`import { B } from "./b";`\
Extension will remove `// some comment` and `const foo = "bar";` strings.

## Disable

You can disable auto sorting for some files, by adding this comment to document:\
`disable-sort-imports`

## Settings

`ts-imports-sort-alphabetically.sortOnSave` - Boolean, default: `true`. Sort imports before file will be saved.

`ts-imports-sort-alphabetically.printWidth` - Number, default: `80`. Prittier-like print width. Max width for single lined import. If bigger, it will be breaked into few lines.

`ts-imports-sort-alphabetically.importsDevide` - Boolean, default: `true`. Add empty line between import's and import type's statements. See image examples below.

`ts-imports-sort-alphabetically.typesTop` - Boolean, default `true`. Position of "import type..." statements relative to "import" statements. See image examples below.

`ts-imports-sort-alphabetically.bracketSpacing` - Boolean, default `true`. Spaces between import brackets "{space...space}".

## Images:

![example-image](https://github.com/vladbelozertsev/ts-imports-sort-alphabetically/blob/main/images/basic-before.png?raw=true)

![example-image](https://github.com/vladbelozertsev/ts-imports-sort-alphabetically/blob/main/images/basic-after.png?raw=true)
Before sort / After sort

![example-image](https://github.com/vladbelozertsev/ts-imports-sort-alphabetically/blob/main/images/devider-with.png?raw=true)

![example-image](https://github.com/vladbelozertsev/ts-imports-sort-alphabetically/blob/main/images/devider-without.png?raw=true)
With / Without devider

![example-image](https://github.com/vladbelozertsev/ts-imports-sort-alphabetically/blob/main/images/print-width.png?raw=true)
Print width

![example-image](https://github.com/vladbelozertsev/ts-imports-sort-alphabetically/blob/main/images/types-top.png?raw=true)

![example-image](https://github.com/vladbelozertsev/ts-imports-sort-alphabetically/blob/main/images/tytes-bottom.png?raw=true)
Type imports top / bottom

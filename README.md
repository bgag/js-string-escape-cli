# js-string-escape-cli

Escape strings for use as JavaScript string literals from command line.

## Usage

The package creates a symlink the in the .bin folder.
You can run it from command line with:

    js-string-escape [options] <input> <output>

### Options

#### CommonJS

`-c` or `--commonjs` wraps the literal into a CommonJS module.export.

#### Quote

`-q` or `--quote` wraps the literal into quotes.

### Double Quite

`-d` or `--double` wrap the literal into double quotes.

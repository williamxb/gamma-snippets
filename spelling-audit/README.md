## Getting Started

This snippet receives the output of a Screaming Frog spellcheck crawl and outputs a parsed file with predefined brand and industry terms removed, and allows the use of multiple dictionaries.

The requirement from this came from our multilingual site - Screaming Frog's audit tools can only spellcheck in a single language.

### Prerequisites

* [Node.js](https://nodejs.org/en/download/package-manager)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [dependencies](https://github.com/williamxb/snippets/blob/main/spelling-audit/package.json):
  ```sh
  npm install
  ```

### Installation

1. Clone the repo.
   ```sh
   git clone https://github.com/williamxb/gamma-snippets.git
   ```
2. Install NPM packages.
   ```sh
   npm install
   ```
3. (optional) Add the Welsh dictionary
   Move the .dic file from the dictionary-cy-gb package to simple-spellchecker/dict and normalise it:
   ```sh
   node cli.js normalize "./dict/en-GB.dic"`
   ```

## Usage

1. Paste a Screaming Frog spellcheck audit into `input.csv`
2. Run the script with Node.js.
   ```sh
   node main
   ```
3. The parsed file can be found in `output.csv`

### Example output

```
wising is incorrect - writing to output.csv
uk - en-GB
wie - nl-NL
wenig - de-DE
visitas - es-ES
sydd - cy-GB
WiFi - local
```

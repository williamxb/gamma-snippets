## Getting Started

This snippet receives the output of a Screaming Frog spellcheck crawl and outputs a parsed file with brand and industry terms removed.

### Prerequisites

* [Node.js](https://nodejs.org/en/download/package-manager)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [dependencies](https://github.com/williamxb/snippets/blob/main/replace-links/package.json):
  ```sh
  npm install
  ```

### Installation

1. Clone the repo.
   ```sh
   git clone https://github.com/williamxb/gamma-snippets.git
   ```
3. Move directory.
   ```sh
   cd spelling-audit/
   ```
4. Install NPM packages.
   ```sh
   npm install
   ```

<!-- USAGE EXAMPLES -->
## Usage

1. Paste a Screaming Frog spellcheck audit into `input.csv`
2. Run the script with Node.js.
   ```sh
   node maIn
   ```
3. The parsed file can be found in `output.csv`

### Example output

```
WLR is in the spellcheck list
wneud is not in the spellcheck list - writing to csv2
```

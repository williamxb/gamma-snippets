## Getting Started

This snippet automatically replaces predefined URLs from content in one file, and outputs it to a separate file.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

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
   cd replace-links/
   ```
4. Install NPM packages.
   ```sh
   npm install
   ```

<!-- USAGE EXAMPLES -->
## Usage

1. Paste content as HTML into `content.txt` as required.
2. Run the script with Node.js.
   ```sh
   node replace
   ```
3. Copy content from `output.txt` and paste in the respective editor.

   _Optional: At this point you can search & replace `rel="noopener noreferrer"` if required._

### Example output

```
Processed Links:
Replaced: https://www.example.org/link-1/ -> https://newexample.org/link-1/
Replaced: https://www.example.org/link-2/ -> https://newexample.org/link-2/
OLD LINK DETECTED: https://www.oldexample.org/link-3/
Replace this with: [user input]
File processed successfully.
```

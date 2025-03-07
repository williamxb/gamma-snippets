## Getting Started

This script scrapes content in a specified container and outputs content-containing elements, removing extraneous formatting, to be copied to our main CMS.

Additionally a quick minifying file to remove conflicts with how WordPress formats HTML - having everything minified helps it behave prectictably.

### Prerequisites

* Python 🐍
* BeautifulSoup

## Usage

1. Add URL to variable.
2. Run the script.
   ```sh
   python3 main.py
   ```
3. Find the output at `output.html`
4. (Optional) Minify output - run the minifying script.
   ```sh
   python3 minify.py
   ```
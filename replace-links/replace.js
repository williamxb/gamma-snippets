const prompt = require("prompt-sync")({ sigint: true });
const fs = require("fs");

// define terminal colours
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const BLUE = "\x1b[34m";
const ENDCOLOR = "\x1b[0m";
const BOLD = "\x1b[1m";
const SEPARATOR = "\x1b[107m\x1b[34m";

// display link replacement prompt for these domains:
const domainWarnings = {
  "gamma.co.uk": "OLD LINK DETECTED",
};

// import list of links
const linkReplacements = require("./linkReplacements").linkReplacements;

const replaceUrls = (content) => {
  // regex to capture url in href attribute
  const hrefRegex = /(<a\s+[^>]*href\s*=\s*["'])([^"']+)(["'][^>]*>)/g;

  return content.replace(hrefRegex, (match, prefix, url, suffix) => {
    // check for url replacement
    for (const [oldLink, newLink] of Object.entries(linkReplacements)) {
      if (url.includes(oldLink)) {
        const replacedUrl = url.replace(oldLink, newLink);
        console.log(`Replaced: ${YELLOW}${url}${ENDCOLOR} -> ${BLUE}${replacedUrl}${ENDCOLOR}`);
        return `${prefix}${replacedUrl}${suffix}`;
      }
    }

    // check for url warning, prompt for replacement
    // retain old url if user input is blank
    for (const [warningDomain, warningMessage] of Object.entries(domainWarnings)) {
      if (url.includes(warningDomain)) {
        // console.warn(`\x1b[33m${warningMessage}\x1b[0m`);
        console.warn(`${RED}${BOLD}${warningMessage}:${ENDCOLOR} ${RED}${url}${ENDCOLOR}`);
        const replacedUrl = prompt(`Replace this with: `);
        if (!replacedUrl) continue;
        else {
          console.log(`Replaced: ${YELLOW}${url}${ENDCOLOR} -> ${BLUE}${replacedUrl}${ENDCOLOR}`);
          return `${prefix}${replacedUrl}${suffix}`;
        }
      }
    }

    // return original url if no replacement is required
    return match;
  });
};

const processHtmlFile = (inputPath, outputPath) => {
  try {
    // read content
    const content = fs.readFileSync(inputPath, "utf8");

    // replace links
    console.log(`${SEPARATOR}\nProcessed Links:${ENDCOLOR}`);
    const updatedContent = replaceUrls(content).replace(' rel="noopener noreferrer"', "");

    // write new content to file
    fs.writeFileSync(outputPath, updatedContent, "utf8");

    console.log(`${GREEN}File processed successfully.${ENDCOLOR}`);
  } catch (error) {
    console.error("Error processing file:", error);
  }
};

processHtmlFile("./content.txt", "./output.txt");

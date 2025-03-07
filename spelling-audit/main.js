const fs = require("fs");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// define terminal colours
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const ENDCOLOR = "\x1b[0m";
const BOLD = "\x1b[1m";

let SpellChecker = require('simple-spellchecker');
let dictionaryEN = SpellChecker.getDictionarySync('en-GB');
let dictionaryNL = SpellChecker.getDictionarySync('nl-NL');
let dictionaryES = SpellChecker.getDictionarySync('es-ES');
let dictionaryDE = SpellChecker.getDictionarySync('de-DE');
let dictionaryCY = SpellChecker.getDictionarySync('cy-GB');

// read and return local dictionary
function readLocalDictionary(path) {
  return fs.readFileSync(path, "utf-8").split(/\r?\n/);
}

function readCsv(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

function checkSpelling(word) {
  const dictionaryLocal = readLocalDictionary(localDictionaryPath);

  return dictionaryEN.spellCheck(word)
    ? { correct: true, language: "en-GB" }
    : dictionaryNL.spellCheck(word)
    ? { correct: true, language: "nl-NL" }
    : dictionaryES.spellCheck(word)
    ? { correct: true, language: "es-ES" }
    : dictionaryDE.spellCheck(word)
    ? { correct: true, language: "de-DE" }
    : dictionaryCY.spellCheck(word)
    ? { correct: true, language: "cy-GB" }
    : dictionaryLocal.includes(word)
    ? { correct: true, language: "local" }
    : { correct: false, language: "unknown" };
}

async function processCSVs(file1Path, file2Path) {
  // clear output file
  fs.writeFile(file2Path, "", function () {
    console.log("output.csv cleared.");
  });

  try {
    let csv1Data = await readCsv(file1Path);
    let csv2Data = await readCsv(file2Path);
    let logData;

    let dataAdded = false;
    let corrections = { total: csv1Data.length, "en-GB": 0, "nl-NL": 0, "es-ES": 0, "de-DE": 0, "cy-GB": 0, local: 0, unknown: 0 };

    for (const row of csv1Data) {
      let spelling = checkSpelling(row.Error);

      if (spelling.correct) {
        console.log(`${BOLD}${row.Error}${ENDCOLOR} ${GREEN}- ${spelling.language}${ENDCOLOR}`);
        corrections[spelling.language]++;
      } else {
        console.log(`${BOLD}${row.Error}${ENDCOLOR} ${RED}is incorrect${ENDCOLOR} - writing to output.csv`);
        corrections[spelling.language]++, (dataAdded = true);
        csv2Data.push(row);
      }

      logData += `${row.Error} - ${spelling.correct ? 'correct' : 'incorrect'} - ${spelling.language}\n`;
    }

    if (dataAdded) {
      let headers = Object.keys(csv1Data[0]); // retain original headers
      let csvWriter = createCsvWriter({
        path: file2Path,
        header: headers.map((header) => ({ id: header, title: header })),
      });

      await csvWriter.writeRecords(csv2Data).then(() => {
        console.log(`\output.csv written.\n${JSON.stringify(corrections, null, 2)}`);
      });

      await fs.appendFile(outputLogPath, logData, function (err) {
        if (err) throw err;
        console.log('output_log.txt updated.');
      });
    } else {
      console.log(`\nNothing to write.`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

const file1Path = "./input.csv";
const file2Path = "./output.csv";
const outputLogPath = "./output_log.txt";
const localDictionaryPath = "./spellcheck.txt";

processCSVs(file1Path, file2Path);

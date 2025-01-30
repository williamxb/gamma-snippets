const fs = require("fs");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// define terminal colours
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const ENDCOLOR = "\x1b[0m";
const BOLD = "\x1b[1m";

// read and store spellcheck
function readSpellcheck(filePath) {
  return fs.readFileSync(spellcheckPath, "utf-8").split(/\r?\n/);
}

// read CSV file
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

async function processCSVs(file1Path, file2Path) {
  try {
    const csv1Data = await readCsv(file1Path);
    const csv2Data = await readCsv(file2Path);
    const spellcheck = readSpellcheck(spellcheckPath);

    // console.log(csv1Data);

    let dataAdded = false;

    csv1Data.forEach(async (row) => {
      // if row.Error is found in spellcheck, do not write to csv2
      if (!spellcheck.includes(row.Error)) {
        console.log(`${BOLD}${row.Error}${ENDCOLOR} ${RED}is not in the spellcheck list${ENDCOLOR} - writing to csv2`);
        dataAdded = true;
        csv2Data.push(row);
      } else {
        console.log(`${BOLD}${row.Error}${ENDCOLOR} ${GREEN}is in the spellcheck list${ENDCOLOR}`);
      }
    });

    if (dataAdded) {
      const headers = Object.keys(csv1Data[0]); // use headers from the first csv
      const csvWriter = createCsvWriter({
        path: file2Path,
        header: headers.map((header) => ({ id: header, title: header })),
      });

      csvWriter.writeRecords(csv2Data);

      await csvWriter.writeRecords(csv2Data);
      console.log("csv2 updated");
    } else {
      console.log("Nothing to write.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

const file1Path = "./input.csv";
const file2Path = "./output.csv";
const spellcheckPath = "./spellcheck.txt";

processCSVs(file1Path, file2Path);

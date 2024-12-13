const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function readCsv(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

async function processCSVs(file1Path, file2Path) {
  try {
    const csv1Data = await readCsv(file1Path);
    const csv2Data = await readCsv(file2Path);

    console.log(csv1Data)

    let dataAdded = false;

    csv2Data.forEach((row) => {
      console.log(`searching for '${row.slug}'`)
      const matchingRow = csv1Data.find((csv1Row) => csv1Row.slug == row.slug);
      //  if matching row found & is empty
      if (matchingRow && (!row.focus_keyword || row.focus_keyword.trim() === '')) {
        console.log(matchingRow);
        row.focus_keyword = matchingRow.focus_keyword;
        dataAdded = true;
      }
    });

    if (dataAdded) {
      const headers = Object.keys(csv2Data[0]);
      const csvWriter = createCsvWriter({
        path: file2Path,
        header: headers.map(header => ({id: header, title: header}))
      });

      await csvWriter.writeRecords(csv2Data);
      console.log('SEO titles have been added to empty fields in the second CSV file.');
    } else {
      console.log('No empty SEO title fields were found in the second CSV file.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

const file1Path = './yoast.csv';
const file2Path = './rankmath.csv';

processCSVs(file1Path, file2Path);
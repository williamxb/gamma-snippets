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

    let dataAdded = false;

    csv2Data.forEach((row) => {
      const matchingRow = csv1Data.find((csv1Row) => csv1Row.slug == row.slug);
      console.log(`looking for '${row.slug}'`);
      console.log(matchingRow)
      if (matchingRow && (!row.seo_description || row.seo_description.trim() === '')) {
        row.seo_description = matchingRow.seo_description;
        dataAdded = true;
        console.log("**** found ****")
      }
    });

    if (dataAdded) {
      const headers = Object.keys(csv2Data[0]);
      const csvWriter = createCsvWriter({
        path: file2Path,
        header: headers.map(header => ({id: header, title: header}))
      });

      await csvWriter.writeRecords(csv2Data);
      console.log('SEO descriptions have been added to empty fields in the second CSV file.');
    } else {
      console.log('No empty SEO description fields were found in the second CSV file.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Replace these with your actual file paths
const file1Path = './meta-descriptions.csv';
const file2Path = './rank-math-export-edited.csv';

processCSVs(file1Path, file2Path);
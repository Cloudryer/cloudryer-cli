import * as fs from "fs";

const toCsvString = function (objectsArryay) {

  const keys = Object.keys(objectsArryay[0]);
  let result = keys.join(',') + '\n';
  const csv = objectsArryay.forEach((obj, index) => {
    let newRow = keys.map(key => {
      return obj[key];
    }).join(',');
    result += newRow;
    if (index < (keys.length )) {
      result += '\n';

    }
  });

  return result;
}


const exportToCsv = function (arrayOfObjects, filename) {
  const csvString = toCsvString(arrayOfObjects);
  fs.writeFile(filename,csvString, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

};

export {exportToCsv, toCsvString};
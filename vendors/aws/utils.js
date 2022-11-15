import {createRequire} from "module";

const require = createRequire(import.meta.url);  // construct the require method
const REGIONS = require("./AWS_Regions.json");


const convertDateObjectToAwsDate = function (date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  function addZeroIfNeeded(number) {
    return number < 10 ? `0${number}` : number;
  }

  return `${year}-${addZeroIfNeeded(month)}-${addZeroIfNeeded(day)}`;
}

const getAwsRegionCodes = function () {
  const regionsCodes = Object.values(REGIONS);
  return regionsCodes;
}

const getRegionName = function (regionCode) {
  const regionName = REGIONS[regionCode];
  return regionName;
}

export {
  convertDateObjectToAwsDate,
  getAwsRegionCodes,
  getRegionName
};
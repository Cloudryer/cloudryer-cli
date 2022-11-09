const PricingCatalog = require('./pricing.json')


const getInstanceCostPerHour = function ({region, instanceType, operatingSystem}) {
  const key = `${region}_${instanceType}_${operatingSystem.toLowerCase()}`;
  const cost = PricingCatalog[key];
  if (!cost) {
    throw new Error(`No cost found for ${key}`);
  }
  return cost;
}

module.exports = {
  getInstanceCostPerHour
}
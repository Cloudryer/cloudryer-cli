export default class TimeSeries {
  constructor(name, valuesArray, timestampsArray) {
    this.name = name;
    this.values = valuesArray;
    this.timestamps = timestampsArray;
  }

  getName() {
    return this.name;
  }
  getValues() {
    return this.values;
  }

  getTimestamps() {
    return this.timestamps;
  }

  getTimeStampsValuesObject() {
    let res = {};
    this.timestamps.forEach((ts, index) => {
      res[ts] = this.values[index];
    });
    return res;
  }

  getLatestValue() {
    return this.values[this.values.length - 1];
  }

  getSum() {
    if (this.values.length === 0) {
      return 0;
    }
    return this.values.reduce((sum, value) => sum + value);
  }

  countValuesLessThan(value) {
    return this.values.filter(v => v < value).length;
  }

  normalize(min, max) {
    const minValue = Math.min(...this.values);
    const maxValue = Math.max(...this.values);
    let normalizedValues;
    if(minValue === maxValue) {
      if(minValue === 0) {
        normalizedValues = this.values.map(() => min);
      } else {
        normalizedValues = this.values.map(() => max);
      }
    } else {
      normalizedValues = this.values.map(value => {
        return min + (value - minValue) * (max - min) / (maxValue - minValue);
      });
    }
    return new TimeSeries(`${this.name}_normalized`, normalizedValues, this.timestamps);
  }

  /**
   * Add a value to the time series to the end
   * @param value - a number
   * @param date - a Date object
   */
  addValue(value, date) {
    this.values.push(value);
    this.timestamps.push(date.toISOString());
  }

  addFirstValue(value, date) {
    this.values.unshift(value);
    this.timestamps.unshift(date.toISOString());
  }

  setName(name) {
    this.name = name;
  }
};


import TimeSeries from '../timeSeries.js';


describe('TimeSeries', () => {
  const timeSeries = new TimeSeries('test',[0, 2, 3, 4, 5], [1, 2, 3, 4, 5]);
  test('it should normalize values', () => {

    expect(timeSeries.normalize(0, 100)).toEqual(new TimeSeries('test_normalized',[0, 40, 60, 80, 100], [1, 2, 3, 4, 5]));
  });

  test('it should normalize zeros vector to zeros', () => {
    const zeros = new TimeSeries('test',[0, 0, 0, 0, 0], [1, 2, 3, 4, 5]);
    expect(zeros.normalize(0, 100)).toEqual(new TimeSeries('test_normalized',[0, 0, 0, 0, 0], [1, 2, 3, 4, 5]));
  })

  test('it should normalize constant non-zeros vector max value', () => {
    const ones = new TimeSeries('test',[1, 1, 1, 1, 1], [1, 2, 3, 4, 5]);
    expect(ones.normalize(0, 100)).toEqual(new TimeSeries('test_normalized',[100, 100, 100, 100, 100], [1, 2, 3, 4, 5]));
  })

  test('it should return count of values below threshold', () => {
    expect(timeSeries.countValuesLessThan(3)).toEqual(2);
  });
});



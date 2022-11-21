import {toCsvString} from "../csvUtils.js";

describe("exportToCsv", () => {

  it("should export to csv", () => {

    const data = [
      {name: "John", age: 25},
      {name: "Jane", age: 23},
      {name: "Jack", age: 30},
    ];

    const csv = toCsvString(data);

    expect(csv).toBe("name,age\nJohn,25\nJane,23\nJack,30");
  });
});
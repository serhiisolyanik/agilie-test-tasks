"use strict";

const fs = require("fs");

const searchRepeatedElement = (arr) => {
  const countingArray = new Array(arr.length - 1).fill(0);

  for (let i = 0; i < arr.length; i++) {
    const index = arr[i] - 1;
    countingArray[index]++;
    if (countingArray[index] > 1) {
      return arr[i];
    }
  }
};

fs.readFile("input.json", (err, data) => {
  if (err) throw err;
  const { arr } = JSON.parse(data);
  const result = searchRepeatedElement(arr);
  const output = { result };
  fs.writeFile("output.json", JSON.stringify(output), (err) => {
    if (err) throw err;
    console.log("Output saved to file");
  });
});

"use strict";

const fs = require("fs");

const game = (num1, num2) => {
  if (num2 % 2 === 0) {
    while (num1 <= num2) {
      num1 *= 2;
      if (num1 === num2) return true;
    }
  } else if (num2 % 10 === 1) {
    while (num1 <= num2) {
      num1 = num1 * 10 + 1;
      if (num1 === num2) return true;
    }
  }
  return false;
};

fs.readFile("input.json", "utf8", (err, data) => {
  if (err) throw err;
  const { num1, num2 } = JSON.parse(data);
  const result = game(num1, num2);
  const output = { result };
  fs.writeFile("output.json", JSON.stringify(output), (err) => {
    if (err) throw err;
    console.log("Output saved to output.json");
  });
});

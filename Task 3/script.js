"use strict";

const fs = require("fs");

const input = JSON.parse(fs.readFileSync("input.json", "utf8"));

// 3.1
const barWeight = input.barWeight;
const availableWeights = input.availableWeights;

const findMinWeight = (targetWeight) => {
  let minWeight = Infinity;
  let selectedWeights = [];

  const combineWeights = (index, count, weightSoFar, weights) => {
    if (index === availableWeights.length || weightSoFar >= targetWeight) {
      if (
        weightSoFar > targetWeight &&
        weightSoFar < minWeight &&
        count <= 24
      ) {
        minWeight = weightSoFar.toFixed(2);
        selectedWeights = weights.slice();
      }
      return;
    }

    // Pick the current weight.
    if (count < 12) {
      weights.push(availableWeights[index]);
      combineWeights(
        index,
        count + 2,
        weightSoFar + 2 * availableWeights[index].weight,
        weights
      );
      weights.pop();
    }

    // Skip the current weight.
    combineWeights(index + 1, count, weightSoFar, weights);
  };

  combineWeights(0, 0, barWeight, []);

  return { minWeight, selectedWeights };
};

// 3.2
const shirts = input.shirts;
const obj = input.obj;

const distributor = (shirts, obj) => {
  const sizesNeeded = Object.entries(obj);
  const assignments = {};

  for (let i = 0; i < sizesNeeded.length; i++) {
    const [participant, sizes] = sizesNeeded[i];
    const size1 = sizes[0];
    const size2 = sizes[1];

    if (sizes.length === 1) {
      shirts[size1]--;
      assignments[participant] = size1;
    } else {
      if (shirts[size1] >= shirts[size2]) {
        shirts[size1]--;
        assignments[participant] = size1;
      } else {
        shirts[size2]--;
        assignments[participant] = size2;
      }
    }
  }

  if (Object.values(shirts).some((e) => e < 0)) {
    return false;
  }

  return assignments;
};

const output1 = findMinWeight(input.targetWeight);
const output2 = distributor(shirts, obj);

const output = { output1, output2 };
fs.writeFileSync("output.json", JSON.stringify(output, null, 2));

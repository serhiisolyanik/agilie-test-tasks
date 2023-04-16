"use strict";

const fs = require("fs");

const countGoodPositions = (n, m, plan) => {
  let count = 0;

  // Check left-right direction for positions on the edges
  for (let i = 0; i < n; i++) {
    if (plan[i][0] === 0) {
      let hasActorRight = false;
      for (let k = 1; k < m; k++) {
        if (plan[i][k] === 1) {
          hasActorRight = true;
          break;
        }
      }
      if (hasActorRight) count++;
    }
    if (plan[i][m - 1] === 0) {
      let hasActorLeft = false;
      for (let k = m - 2; k >= 0; k--) {
        if (plan[i][k] === 1) {
          hasActorLeft = true;
          break;
        }
      }
      if (hasActorLeft) count++;
    }
  }
  // Check up-down direction for positions on the edges
  for (let j = 0; j < m; j++) {
    if (plan[0][j] === 0) {
      let hasActorDown = false;
      for (let k = 1; k < n; k++) {
        if (plan[k][j] === 1) {
          hasActorDown = true;
          break;
        }
      }
      if (hasActorDown) count++;
    }
    if (plan[n - 1][j] === 0) {
      let hasActorUp = false;
      for (let k = n - 2; k >= 0; k--) {
        if (plan[k][j] === 1) {
          hasActorUp = true;
          break;
        }
      }
      if (hasActorUp) count++;
    }
  }

  // Check non-edge positions for all four directions
  for (let i = 1; i < n - 1; i++) {
    for (let j = 1; j < m - 1; j++) {
      if (plan[i][j] === 0) {
        let hasActorLeft = false;
        for (let k = j - 1; k >= 0; k--) {
          if (plan[i][k] === 1) {
            hasActorLeft = true;
            break;
          }
        }
        if (hasActorLeft) count++;
        let hasActorRight = false;
        for (let k = j + 1; k < m; k++) {
          if (plan[i][k] === 1) {
            hasActorRight = true;
            break;
          }
        }
        if (hasActorRight) count++;
        let hasActorUp = false;
        for (let k = i - 1; k >= 0; k--) {
          if (plan[k][j] === 1) {
            hasActorUp = true;
            break;
          }
        }
        if (hasActorUp) count++;

        let hasActorDown = false;
        for (let k = i + 1; k < n; k++) {
          if (plan[k][j] === 1) {
            hasActorDown = true;
            break;
          }
        }
        if (hasActorDown) count++;
      }
    }
  }
  return count;
};

fs.readFile("input.json", (err, data) => {
  if (err) throw err;
  const { n, m, plan } = JSON.parse(data);
  const goodPositions = countGoodPositions(n, m, plan);
  const output = { goodPositions };
  fs.writeFile("output.json", JSON.stringify(output), (err) => {
    if (err) throw err;
    console.log("Output saved to output.json");
  });
});

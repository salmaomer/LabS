function sum(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

/* when we want use this a sum function on anywhere in this project */
/* #1 make the function readable */
module.exports = {sum,multiply};
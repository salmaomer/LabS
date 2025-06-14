/* #2 initialize the file in the variable */
const math = require('./mathfile');

test('adds 8 + 2 to equal 10', () => {
  expect(math.sum(8, 2)).toBe(10);
});

test('adds 150 * 5 to equal 750', () => {
  expect(math.multiply(150, 5)).toBe(750);
});
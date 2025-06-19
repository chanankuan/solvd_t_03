// Create a function called createCounter that returns a closure.
// The closure should be a counter function that increments the count on each call and returns the updated count.
// Each closure should have its own independent count.

function createCounter() {
  let count = 0;

  return function () {
    return ++count;
  };
}

module.exports = { createCounter };

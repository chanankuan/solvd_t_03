// Implement a higher-order function called repeatFunction that takes a function and a number as arguments.
// The function should return a new function that invokes the original function multiple times based on the provided number.
// If the number is negative, the new function should invoke the original function indefinitely until stopped.

function repeatFunction(fn, n) {
  return function (...args) {
    if (typeof fn !== "function") {
      throw new TypeError("Expected a function");
    }

    if (n < 0) {
      const intervalId = setInterval(() => {
        fn(...args);
      }, 0);

      return intervalId;
    }

    for (let i = 0; i < n; i++) {
      fn(...args);
    }
  };
}

module.exports = { repeatFunction };

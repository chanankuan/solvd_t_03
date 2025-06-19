// Implement a lazy evaluation function called lazyMap that takes an array and a mapping function.
// The function should return a lazy generator that applies the mapping function to each element of the array one at a time.

function lazyMap(arr, fn) {
  let i = 0;

  return {
    next() {
      if (i < arr.length) {
        const value = fn(arr[i]);

        i++;
        return { value, done: false };
      }

      return { value: undefined, done: true };
    },
  };
}

const nums = [1, 2, 3, 4];
const iterator = lazyMap(nums, (x) => x * 2);

module.exports = { lazyMap };

// console.log(iterator.next()); // { value: 2, done: false }
// console.log(iterator.next()); // { value: 4, done: false }
// console.log(iterator.next()); // { value: 6, done: false }
// console.log(iterator.next()); // { value: 8, done: false }
// console.log(iterator.next()); // { value: undefined, done: true }

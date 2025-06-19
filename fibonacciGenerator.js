function fibonacciGenerator(n) {
  let num1 = 0;
  let num2 = 1;
  let i = 0;

  return {
    next() {
      if (i > n) {
        return { value: undefined, done: true };
      }

      let value;

      if (i === 0) {
        value = 0;
      } else if (i === 1) {
        value = 1;
      } else {
        value = num1 + num2;
        num1 = num2;
        num2 = value;
      }

      i++;
      return { value, done: false };
    },
  };
}

// const generator = fibonacciGenerator(10);
// console.log(generator.next().value); // 0 -> 0
// console.log(generator.next().value); // 1 -> 1
// console.log(generator.next().value); // 2 -> 1
// console.log(generator.next().value); // 3 -> 2
// console.log(generator.next().value); // 4 -> 3
// console.log(generator.next().value); // 5 -> 5
// console.log(generator.next().value); // 6 -> 8
// console.log(generator.next().value); // 7 -> 13
// console.log(generator.next().value); // 8 -> 21
// console.log(generator.next().value); // 9 -> 34
// console.log(generator.next().value); // 10 -> 55
// console.log(generator.next().value); // 11 -> 89
// console.log(generator.next().value); // 12 -> 144
// console.log(generator.next().value); // 13 -> 233
// console.log(generator.next().value); // 14 -> 377
// console.log(generator.next().value); // 15 -> 610
// console.log(generator.next().value); // 16 -> 987
// console.log(generator.next().value); // 17 -> 1597
// console.log(generator.next().value); // 18 -> 2584
// console.log(generator.next().value); // 19 -> 4181
// console.log(generator.next().value); // 20 -> 6765

module.exports = { fibonacciGenerator };

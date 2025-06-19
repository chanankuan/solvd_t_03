// Create a recursive function called power that takes a base and an exponent as arguments.
// The function should calculate the power of the base to the exponent using recursion.

function power(base, exp) {
  if (exp === 0) return 1;

  return base * power(base, exp - 1);
}

console.log(power(2, 10));

module.exports = { power };

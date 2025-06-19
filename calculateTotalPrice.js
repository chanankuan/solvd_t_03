// Create a pure function called calculateTotalPrice that takes an array of products as an argument.
// The function should return the total price of all products, without modifying the original array or its items.

function calculateTotalPrice(products) {
  return products.reduce((acc, { price }) => acc + price, 0);
}

module.exports = { calculateTotalPrice };

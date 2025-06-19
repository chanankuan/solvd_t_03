// Implement a pure function called calculateDiscountedPrice that takes an array of products and a discount percentage as arguments.
// The function should return a new array of products with discounted prices based on the given percentage, without modifying the original products.

function calculateDiscountedPrice(products, discount) {
  return products.map((product) => {
    const newPrice = (product.price * (100 - discount)) / 100;

    return { ...product, price: newPrice };
  });
}

module.exports = { calculateDiscountedPrice };

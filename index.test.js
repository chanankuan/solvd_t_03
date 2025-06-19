// Task 1: Immutability and Pure Functions
const { calculateTotalPrice } = require("./calculateTotalPrice");
const { calculateDiscountedPrice } = require("./calculateDiscountedPrice");

// Task 2: Function Composition and Point-Free Style
const { getFullName } = require("./getFullName");
const { filterUniqueWords } = require("./filterUniqueWords");
const { getAverageGrade } = require("./getAverageGrade");

// Task 3: Closures and Higher-Order Functions
const { createCounter } = require("./createCounter");
const { repeatFunction } = require("./repeatFunction");

// Task 4: Recursion and Tail Call Optimization
const { calculateFactorial } = require("./calculateFactorial");
const { power } = require("./power");

// Task 5: Lazy Evaluation and Generators (do not use yield)
const { lazyMap } = require("./lazyMap");
const { fibonacciGenerator } = require("./fibonacciGenerator");

describe("calculateDiscountedPrice", () => {
  const originalProducts = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Phone", price: 500 },
    { id: 3, name: "Headphones", price: 200 },
  ];

  it("should return a new array with discounted prices", () => {
    const discount = 10;
    const result = calculateDiscountedPrice(originalProducts, discount);

    expect(result).toEqual([
      { id: 1, name: "Laptop", price: 900 },
      { id: 2, name: "Phone", price: 450 },
      { id: 3, name: "Headphones", price: 180 },
    ]);
  });

  it("should not mutate the original array", () => {
    const originalCopy = JSON.parse(JSON.stringify(originalProducts));
    calculateDiscountedPrice(originalProducts, 15);
    expect(originalProducts).toEqual(originalCopy);
  });

  it("should return same prices if discount is 0", () => {
    const result = calculateDiscountedPrice(originalProducts, 0);
    expect(result).toEqual(originalProducts);
  });

  it("should apply 100% discount and return all prices as 0", () => {
    const result = calculateDiscountedPrice(originalProducts, 100);
    expect(result).toEqual([
      { id: 1, name: "Laptop", price: 0 },
      { id: 2, name: "Phone", price: 0 },
      { id: 3, name: "Headphones", price: 0 },
    ]);
  });

  it("should handle empty product array", () => {
    const result = calculateDiscountedPrice([], 50);
    expect(result).toEqual([]);
  });

  it("should round to two decimal places", () => {
    const products = [{ id: 1, name: "Item", price: 19.99 }];
    const result = calculateDiscountedPrice(products, 33);
    expect(result[0].price).toBeCloseTo(13.39, 2);
  });
});

describe("calculateTotalPrice", () => {
  it("should return the sum of all product prices", () => {
    const products = [
      { id: 1, name: "Laptop", price: 1000 },
      { id: 2, name: "Mouse", price: 50 },
      { id: 3, name: "Keyboard", price: 150 },
    ];
    expect(calculateTotalPrice(products)).toBe(1200);
  });

  it("should return 0 for an empty product array", () => {
    expect(calculateTotalPrice([])).toBe(0);
  });

  it("should not modify the original array", () => {
    const products = [
      { id: 1, name: "Item A", price: 10 },
      { id: 2, name: "Item B", price: 20 },
    ];
    const original = JSON.stringify(products);
    calculateTotalPrice(products);
    expect(JSON.stringify(products)).toBe(original);
  });

  it("should handle prices with decimals", () => {
    const products = [
      { id: 1, name: "Item A", price: 19.99 },
      { id: 2, name: "Item B", price: 30.01 },
    ];
    expect(calculateTotalPrice(products)).toBeCloseTo(50.0, 2);
  });

  it("should handle negative prices (e.g., refunds or discounts)", () => {
    const products = [
      { id: 1, name: "Item A", price: 100 },
      { id: 2, name: "Discount", price: -20 },
    ];
    expect(calculateTotalPrice(products)).toBe(80);
  });
});

describe("getFullName", () => {
  it("should return full name with first and last name", () => {
    const person = { firstName: "John", lastName: "Doe" };
    expect(getFullName(person)).toBe("John Doe");
  });

  it("should return correct full name with mixed casing", () => {
    const person = { firstName: "mARy", lastName: "jAnE" };
    expect(getFullName(person)).toBe("mARy jAnE");
  });

  it("should return full name even if first or last name is empty string", () => {
    expect(getFullName({ firstName: "", lastName: "Smith" })).toBe(" Smith");
    expect(getFullName({ firstName: "John", lastName: "" })).toBe("John ");
    expect(getFullName({ firstName: "", lastName: "" })).toBe(" ");
  });
});

describe("filterUniqueWords", () => {
  it("should return unique words in alphabetical order", () => {
    const text = "apple banana Apple orange banana";
    const result = filterUniqueWords(text);
    expect(result).toEqual(["Apple", "apple", "banana", "orange"]);
  });

  it("should return an empty array for an empty string", () => {
    expect(filterUniqueWords("")).toEqual([]);
  });

  it("should handle punctuation by splitting correctly", () => {
    const text = "hello, world! Hello... world";
    const result = filterUniqueWords(text);
    expect(result).toEqual(["Hello", "hello", "world"]);
  });

  it("should trim extra spaces and return sorted unique words", () => {
    const text = "   dog    cat   bird  dog   ";
    const result = filterUniqueWords(text);
    expect(result).toEqual(["bird", "cat", "dog"]);
  });

  it("should treat words with different cases as different (case-sensitive)", () => {
    const text = "Tree tree TREE";
    const result = filterUniqueWords(text);
    expect(result).toEqual(["TREE", "Tree", "tree"]);
  });

  it("should work with a single word", () => {
    expect(filterUniqueWords("banana")).toEqual(["banana"]);
  });
});

describe("createCounter", () => {
  it("should return a function", () => {
    const counter = createCounter();
    expect(typeof counter).toBe("function");
  });

  it("should start from 1 on first call", () => {
    const counter = createCounter();
    expect(counter()).toBe(1);
  });

  it("should increment the count with each call", () => {
    const counter = createCounter();
    expect(counter()).toBe(1);
    expect(counter()).toBe(2);
    expect(counter()).toBe(3);
  });

  it("should maintain independent counts for each counter", () => {
    const counter1 = createCounter();
    const counter2 = createCounter();

    expect(counter1()).toBe(1);
    expect(counter1()).toBe(2);

    expect(counter2()).toBe(1); // independent instance
    expect(counter2()).toBe(2);
    expect(counter1()).toBe(3); // continues independently
  });
});

describe("calculateFactorial", () => {
  it("should return 1 for input 0", () => {
    expect(calculateFactorial(0)).toBe(1);
  });

  it("should return 1 for input 1", () => {
    expect(calculateFactorial(1)).toBe(1);
  });

  it("should correctly calculate small factorials", () => {
    expect(calculateFactorial(3)).toBe(6); // 3 * 2 * 1
    expect(calculateFactorial(5)).toBe(120); // 5 * 4 * 3 * 2 * 1
    expect(calculateFactorial(7)).toBe(5040);
  });

  it("should handle larger numbers without crashing", () => {
    // 20! = 2432902008176640000
    expect(calculateFactorial(20)).toBe(2432902008176640000);
  });

  it("should throw an error for negative input", () => {
    expect(() => calculateFactorial(-1)).toThrow();
    expect(() => calculateFactorial(-100)).toThrow();
  });

  it("should throw or handle non-integer input", () => {
    expect(() => calculateFactorial(4.5)).toThrow();
    expect(() => calculateFactorial("5")).toThrow();
  });
});

describe("power", () => {
  it("should return 1 when exponent is 0 (base^0 = 1)", () => {
    expect(power(2, 0)).toBe(1);
    expect(power(100, 0)).toBe(1);
  });

  it("should return base when exponent is 1", () => {
    expect(power(5, 1)).toBe(5);
    expect(power(-3, 1)).toBe(-3);
  });

  it("should correctly compute positive powers", () => {
    expect(power(2, 3)).toBe(8); // 2 * 2 * 2
    expect(power(3, 4)).toBe(81); // 3 * 3 * 3 * 3
    expect(power(5, 2)).toBe(25);
  });

  it("should handle exponent of 1 and base of 0", () => {
    expect(power(0, 1)).toBe(0);
  });

  it("should return 0 when base is 0 and exponent > 0", () => {
    expect(power(0, 5)).toBe(0);
  });

  it("should throw an error or handle negative exponents (if not supported)", () => {
    expect(() => power(2, -1)).toThrow();
    expect(() => power(5, -3)).toThrow();
  });

  it("should correctly compute power when base is 1", () => {
    expect(power(1, 100)).toBe(1);
  });

  it("should correctly compute power when base is -1", () => {
    expect(power(-1, 2)).toBe(1);
    expect(power(-1, 3)).toBe(-1);
  });
});

describe("getAverageGrade", () => {
  it("should calculate the average grade of all students", () => {
    const students = [
      { name: "Alice", grades: [80, 90, 100] },
      { name: "Bob", grades: [70, 60] },
      { name: "Charlie", grades: [100] },
    ];
    expect(getAverageGrade(students)).toBeCloseTo(83.33, 2); // Total: 500 / 6
  });

  it("should return NaN if there are no students", () => {
    expect(getAverageGrade([])).toBeNaN();
  });

  it("should return NaN if no grades are provided", () => {
    const students = [
      { name: "Alice", grades: [] },
      { name: "Bob", grades: [] },
    ];
    expect(getAverageGrade(students)).toBeNaN();
  });

  it("should work with a single student with one grade", () => {
    const students = [{ name: "Solo", grades: [88] }];
    expect(getAverageGrade(students)).toBe(88);
  });

  it("should not mutate the original array or objects", () => {
    const original = [{ name: "Test", grades: [100, 90] }];
    const clone = JSON.parse(JSON.stringify(original));
    getAverageGrade(original);
    expect(original).toEqual(clone); // Check no mutation
  });

  it("should correctly compute average when some students have no grades", () => {
    const students = [
      { name: "Student A", grades: [] },
      { name: "Student B", grades: [100, 80] },
      { name: "Student C", grades: [] },
    ];
    expect(getAverageGrade(students)).toBe(90);
  });
});

describe("repeatFunction", () => {
  beforeEach(() => {
    jest.useFakeTimers(); // For testing infinite calls
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("calls the function n times when n is positive", () => {
    const mockFn = jest.fn();
    const repeat3 = repeatFunction(mockFn, 3);
    repeat3();
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it("calls the function 0 times when n is 0", () => {
    const mockFn = jest.fn();
    const repeat0 = repeatFunction(mockFn, 0);
    repeat0();
    expect(mockFn).not.toHaveBeenCalled();
  });

  it("calls the function with arguments", () => {
    const mockFn = jest.fn();
    const repeat2 = repeatFunction(mockFn, 2);
    repeat2("hello", 123);
    expect(mockFn).toHaveBeenCalledWith("hello", 123);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it("throws error if fn is not a function", () => {
    expect(() => repeatFunction(null, 2)()).toThrow(TypeError);
    expect(() => repeatFunction(42, 1)()).toThrow("Expected a function");
  });
});

describe("lazyMap", () => {
  it("should lazily apply a mapping function to each item", () => {
    const arr = [1, 2, 3];
    const mapFn = (x) => x * 2;

    const generator = lazyMap(arr, mapFn);

    expect(generator.next().value).toBe(2); // 1 * 2
    expect(generator.next().value).toBe(4); // 2 * 2
    expect(generator.next().value).toBe(6); // 3 * 2
    expect(generator.next().done).toBe(true); // end of array
  });

  it("should not call the map function until next() is called", () => {
    const arr = [10, 20];
    const mockFn = jest.fn((x) => x + 1);

    const generator = lazyMap(arr, mockFn);

    // Before any next() calls
    expect(mockFn).not.toHaveBeenCalled();

    // Call next once
    expect(generator.next().value).toBe(11);
    expect(mockFn).toHaveBeenCalledTimes(1);

    // Call next again
    expect(generator.next().value).toBe(21);
    expect(mockFn).toHaveBeenCalledTimes(2);

    // End of generator
    expect(generator.next().done).toBe(true);
  });

  it("should work with an empty array", () => {
    const arr = [];
    const mapFn = (x) => x * 100;

    const generator = lazyMap(arr, mapFn);

    expect(generator.next().done).toBe(true);
  });

  it("should handle non-numeric transformations", () => {
    const arr = ["a", "b", "c"];
    const mapFn = (char) => char.toUpperCase();

    const generator = lazyMap(arr, mapFn);

    expect(generator.next().value).toBe("A");
    expect(generator.next().value).toBe("B");
    expect(generator.next().value).toBe("C");
    expect(generator.next().done).toBe(true);
  });
});

describe("fibonacciGenerator", () => {
  it("should generate the correct first 10 Fibonacci numbers", () => {
    const expected = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
    const gen = fibonacciGenerator();

    for (const num of expected) {
      expect(gen.next().value).toBe(num);
    }
  });

  it("should be infinite (not done)", () => {
    const gen = fibonacciGenerator();
    const { done } = gen.next();
    expect(done).toBe(false);
  });

  it("should generate large Fibonacci numbers correctly", () => {
    const gen = fibonacciGenerator();
    let current;

    // Advance to the 20th Fibonacci number
    for (let i = 0; i <= 20; i++) {
      current = gen.next().value;
    }

    // The 21st Fibonacci number is 10946
    expect(current).toBe(6765);
  });

  it("should not calculate next value until next() is called", () => {
    const gen = fibonacciGenerator();

    // The generator should start from 0 but not advance without .next()
    const firstCall = gen.next();
    expect(firstCall.value).toBe(0);

    const secondCall = gen.next();
    expect(secondCall.value).toBe(1);

    const thirdCall = gen.next();
    expect(thirdCall.value).toBe(1);

    const fourthCall = gen.next();
    expect(fourthCall.value).toBe(2);
  });
});

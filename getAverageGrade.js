// Implement a function called getAverageGrade that takes an array of student objects, each containing a name and grades property.
// The function should return the average grade of all students, without modifying the original array or its items.
// Use function composition and point-free style.

function compose(...fns) {
  return function (x) {
    return fns.reduce((v, f) => f(v), x);
  };
}

// Helpers
function pluckGrades(students) {
  return students.flatMap((student) => student.grades);
}

function sum(numbers) {
  return numbers.reduce((acc, val) => acc + val, 0);
}

function count(arr) {
  return arr.length;
}

function divide(a, b) {
  return a / b;
}

function average(grades) {
  return divide(sum(grades), count(grades));
}

const getAverageGrade = compose(pluckGrades, average);

module.exports = { getAverageGrade };

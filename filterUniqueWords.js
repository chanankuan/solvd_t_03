// Create a function called filterUniqueWords that takes a string of text and returns an array of unique words, sorted in alphabetical order, without using explicit loops.
// Use function composition and point-free style.

function compose(...fns) {
  return function (x) {
    return fns.reduce((v, f) => f(v), x);
  };
}

function splitText(str) {
  return str.split(" ");
}

function removeEmpty(words) {
  return words.filter((w) => w);
}

function removePunctuation(words) {
  return words.map((w) =>
    w.replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, "")
  );
}

function unique(words) {
  return [...new Set(words)];
}

function sort(words) {
  return [...words].sort();
}

const filterUniqueWords = compose(
  splitText,
  removeEmpty,
  removePunctuation,
  unique,
  sort
);

module.exports = { filterUniqueWords };

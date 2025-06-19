// Implement a function called getFullName that takes a person object with firstName and lastName properties.
// The function should return the person's full name in the format "FirstName LastName".

function getFullName(person) {
  const { firstName, lastName } = person;

  return firstName + " " + lastName;
}

module.exports = { getFullName };

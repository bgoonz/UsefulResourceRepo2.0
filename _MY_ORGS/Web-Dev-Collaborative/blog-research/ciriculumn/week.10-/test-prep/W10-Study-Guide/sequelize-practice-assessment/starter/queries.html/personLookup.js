const { Person, Course  } = require('../models');

async function lookupPersonAndCourses(personId) {
  // Find person and associated courses by `personId`
};

async function lookupPersonByLastName(lastName) {
  // Find people by `lastName`
};

async function lookupCoursesByPersonEmail(email) {
  // Find person by `email` and return associated courses
};

module.exports = {
  lookupPersonAndCourses,
  lookupPersonByLastName,
  lookupCoursesByPersonEmail,
};

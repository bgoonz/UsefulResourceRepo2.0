const { Person, Course  } = require('../models');

async function lookupPersonAndCourses(personId) {
  const person = await Person.findByPk(personId, {
    include: Course,
  });

  return person;
};

async function lookupPersonByLastName(lastName) {
  const people = await Person.findAll({
    where: {
      lastName,
    }
  });

  return people;
};

async function lookupCoursesByPersonEmail(email) {
  const person = await Person.findOne({
    where: {
      email,
    },
    include: Course
  });
  return person.Courses;
};

module.exports = {
  lookupPersonAndCourses,
  lookupPersonByLastName,
  lookupCoursesByPersonEmail,
};

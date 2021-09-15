const express = require("express");
const db = require('../../db/models');
const { User, Question, Answer, Vote } = db;
const { Op } = require("sequelize");
const router = express.Router();
const { asyncHandler } = require('../../utils');

router.post('/', asyncHandler(async(req, res, next) => {
  let { search } = req.body;         // Grab search value
  let relevantQuestions = [];
  let questionIds = [];
  let answers = [];

  search = search.toLowerCase();                              // Make it lowercase
  const questions = await Question.findAll();
  // Search through questions list to find relevant questions
  for (let i = 0; i < questions.length; i++) {
    let questionText = questions[i].questionText.toLowerCase();
    let questionSubject = questions[i].questionSubject.toLowerCase();

    if (questionText.includes(` ${search}`) || questionSubject.includes(` ${search}`)
     || questionText.startsWith(search)      || questionSubject.startsWith(search)) {
      relevantQuestions.push(questions[i]);
      questionIds.push(questions[i].id);
    }
  }

  let noRelevantQuestions;

  if (relevantQuestions.length === 0) {
    noRelevantQuestions = {
      questionSubject: `No results found`,
      questionText: `We couldn't find any results for your search!`,
      answers: []
    };
  } else {
    console.log(questionIds)
    // Loop through questions and find associated answers
    answers = await Answer.findAll({
      where: {
        questionId: {
          [Op.in]: questionIds,
        }
      },
    });
    relevantQuestions = relevantQuestions.map(question => {
      question.answers = [];
      for (let i = 0; i < answers.length; i++) {
        if (question.id === answers[i].questionId) {
          question.answers.push(answers[i]);
        }
      }
      return question;
    });
  }
  res.render('search', { relevantQuestions, noRelevantQuestions, search });
}));


module.exports = {
  searchRouter: router,
}

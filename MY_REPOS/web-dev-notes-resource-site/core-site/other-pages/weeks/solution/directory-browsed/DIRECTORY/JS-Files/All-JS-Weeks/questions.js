const express = require('express');
const db = require('../db/models');
const { User, Question, Answer, Vote } = db;
const { asyncHandler } = require('../utils');
const { Op } = require("sequelize");

const router = express.Router();


router.get('/', asyncHandler(async(req, res, next) => {
  // Get all questions
  const questions = await Question.findAll();

  res.render('questions', { questions });
}));

router.get('/:id', asyncHandler(async(req, res, next) => {
  const questionId = parseInt(req.params.id);
  // Find question based on id
  const question = await Question.findByPk(questionId);
  // Find associated answers based on id
  console.log(questionId);
  const answers = await Answer.findAll({
    where: {
      questionId: {
        [Op.in]: [questionId],
      }
    },
  });

  res.render('question', { question, answers });
}));

module.exports = {
  questionsRouter: router,
};

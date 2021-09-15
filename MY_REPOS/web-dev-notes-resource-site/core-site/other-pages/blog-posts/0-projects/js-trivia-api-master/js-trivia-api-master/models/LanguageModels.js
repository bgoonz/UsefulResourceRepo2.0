const mongoose = require("mongoose");
const supportedLanguages = require('../supportedLanguages')

const LanguageSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  question: {
    type: String,
  },
  codeSnippet: {
    type: String,
  },
  answerOptions: {
    A: { type: String },
    B: { type: String },
    C: { type: String },
    D: { tyoe: String },
  },
  correctAnswer: {
    type: String,
  },
  AnswerExplanation: {
    type: String,
  },
});

const languageModels = supportedLanguages.map(lang => {
    return mongoose.model(lang, LanguageSchema)
})

module.exports = languageModels

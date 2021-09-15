
const express = require('express');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { requireAuth } = require('../auth');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();

const visitValidators = [
  check('visitedOn')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Visited On')
    .isISO8601()
    .withMessage('Please provide a valid date for Visited On'),
  check('rating')
    .isInt({ min: 0, max: 5 })
    .withMessage('Please provide a number between 1 and 5 for Rating'),
];

router.get('/attraction/:attractionId(\\d+)/visit/add', requireAuth, csrfProtection,
  asyncHandler(async (req, res) => {
    const attractionId = parseInt(req.params.attractionId, 10);
    const attraction = await db.Attraction.findByPk(attractionId, { include: ['park'] });
    const visit = db.AttractionVisit.build();
    res.render('visit-add', {
      title: 'Add Visit',
      attraction,
      visit,
      csrfToken: req.csrfToken(),
    });
  }));

router.post('/attraction/:attractionId(\\d+)/visit/add', requireAuth, csrfProtection, visitValidators,
  asyncHandler(async (req, res) => {
    const attractionId = parseInt(req.params.attractionId, 10);
    const attraction = await db.Attraction.findByPk(attractionId, { include: ['park'] });

    const {
      visitedOn,
      rating,
      comments,
    } = req.body;

    const visit = db.AttractionVisit.build({
      userId: res.locals.user.id,
      attractionId,
      visitedOn,
      rating,
      comments,
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await visit.save();
      res.redirect(`/attraction/${attractionId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('visit-add', {
        title: 'Add Visit',
        attraction,
        visit,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  }));

module.exports = router;

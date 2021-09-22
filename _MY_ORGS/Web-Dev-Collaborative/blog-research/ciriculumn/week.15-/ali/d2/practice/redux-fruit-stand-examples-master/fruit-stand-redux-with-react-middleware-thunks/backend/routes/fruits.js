const express = require('express');
const { check } = require('express-validator');
const { Op } = require('sequelize');

const {
  asyncHandler,
  handleValidationErrors,
} = require('../utils');
const db = require('../db/models');

const { Fruit } = db;

const router = express.Router();

/**
 * Returns the list of available fruits.
 */
router.get('/', asyncHandler(async (req, res) => {
  const fruits = await Fruit.findAll({
    order: [['createdAt', 'ASC']],
    attributes: ['id', 'name'],
  });
  res.json({ fruits });
}));

const validateFruits = [
  check('fruits')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an array of fruits to add')
    .isArray({ min: 1 })
    .withMessage('Please provide an array of fruits to add that contains at least one element'),
  handleValidationErrors,
];

/**
 * Adds one or more fruits. Fruit names are converted to
 * uppercase before saving to the database.
 */
router.post('/',
  validateFruits,
  asyncHandler(async (req, res) => {
    const { fruits } = req.body;
    const fruitsToAdd = fruits
      .map((name) => ({ name: name.toUpperCase() }));
    const fruitInstances = await Fruit.bulkCreate(fruitsToAdd);
    const fruitsToReturn = fruitInstances
      .map((r) => ({ id: r.id, name: r.name }));
    res.status(201).json({ addedFruits: fruitsToReturn });
  }));

const validateFruit = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a fruit name to sell'),
  handleValidationErrors,
];

/**
 * "Sells" a single fruit by finding the first occurrence
 * of the provided fruit name and deleting it from the database.
 */
router.delete('/one',
  validateFruit,
  asyncHandler(async (req, res) => {
    const { name } = req.body;
    const fruit = await Fruit.findOne({ where: { name: name.toUpperCase() } });
    if (fruit === null) {
      res.status(404).json({ message: `A fruit with the name of '${name}' wasn't found` });
    } else {
      await fruit.destroy();
      const fruitToReturn = { id: fruit.id, name: fruit.name };
      res.status(200).json(fruitToReturn);
    }
  }));

const validateFruitIDs = [
  check('fruitIDs')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an array of fruit IDs to sell')
    .isArray({ min: 1 })
    .withMessage('Please provide an array of fruit IDs to sell that contains at least one element'),
  handleValidationErrors,
];

/**
 * "Sells" multiple fruits by retrieving the fruits from the
 * database using the provided fruit IDs and deleting the
 * available fruits from the database. Fruit IDs that can't be
 * initially retrieved from the database are ignored.
 */
router.delete('/multiple',
  validateFruitIDs,
  asyncHandler(async (req, res) => {
    const { fruitIDs } = req.body;
    const fruitsToSell = await Fruit.findAll({ where: { id: { [Op.in]: fruitIDs } } });
    const fruitIDsToSell = fruitsToSell.map((fruit) => fruit.id);
    await Fruit.destroy({ where: { id: { [Op.in]: fruitIDsToSell } } });
    const fruitsToReturn = fruitsToSell.map((fruit) => ({ id: fruit.id, name: fruit.name }));
    res.status(200).json({ soldFruits: fruitsToReturn });
  }));

module.exports = router;

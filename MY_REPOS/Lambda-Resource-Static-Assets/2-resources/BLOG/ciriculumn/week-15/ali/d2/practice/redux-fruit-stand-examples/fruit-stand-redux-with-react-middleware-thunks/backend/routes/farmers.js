const express = require('express');
const { check } = require('express-validator');

const {
  asyncHandler,
  handleValidationErrors,
} = require('../utils');
const db = require('../db/models');

const { Farmer } = db;

const router = express.Router();

/**
 * Retrieves the list of farmers.
 */
router.get('/', asyncHandler(async (req, res) => {
  const farmers = await Farmer.findAll({
    order: [['name', 'ASC']],
    attributes: ['id', 'name', 'paid'],
  });
  res.json({ farmers });
}));

const validateFarmer = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a farmer name to hire'),
  handleValidationErrors,
];

/**
 * Adds a new farmer.
 */
router.post('/',
  validateFarmer,
  asyncHandler(async (req, res) => {
    const { name } = req.body;
    const farmerInstance = await Farmer.create({ name, paid: false });
    const farmerToReturn = {
      id: farmerInstance.id,
      name: farmerInstance.name,
      paid: farmerInstance.paid,
    };
    res.status(201).json(farmerToReturn);
  }));

/**
 * "Pays" the farmer for the provided farmer ID by setting
 * their `paid` column value to `true`.
 */
router.patch('/:id(\\d+)/pay',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const farmerId = parseInt(id, 10);
    const farmerInstance = await Farmer.findByPk(farmerId);
    if (farmerInstance === null) {
      res.status(404).json({ message: `A farmer with an ID of '${farmerId}' wasn't found` });
    } else {
      await farmerInstance.update({ paid: true });
      const farmerToReturn = {
        id: farmerInstance.id,
        name: farmerInstance.name,
        paid: farmerInstance.paid,
      };
      res.status(200).json(farmerToReturn);
    }
  }));

module.exports = router;

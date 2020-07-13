const express = require('express');
const HttpError = require('../models/http-error');
const { check } = require('express-validator');


const router = express.Router();

const foodControllers = require('../controllers/food-controllers');

router.get('/:fid', foodControllers.getFoodById);

router.get('/foodgroup/:fgid', foodControllers.getFoodsByFoodGroupId);

router.post(
  '/',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address')
      .not()
      .isEmpty()
  ],
  foodControllers.createFood
);

router.patch(
  '/:fid',
  [
    check('name')
      .not()
      .isEmpty(),
    check('details').isLength({ min: 5 })
  ],
  foodControllers.updateFood
);

router.delete('/:fid', foodControllers.deleteFood);

module.exports = router;
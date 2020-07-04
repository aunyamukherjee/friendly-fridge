const express = require('express');
const HttpError = require('../models/http-error');
const { check } = require('express-validator');

const placesControllers = require('../controllers/places-controllers');

const router = express.Router();

const foodControllers = require('../controllers/food-controllers');

router.get('/:fid', foodControllers.getFoodById);

router.get('/foodgroup/:fgid', foodControllers.getFoodsByFoodGroupId);


//router.get('/:pid', placesControllers.getPlaceById);

//router.get('/user/:uid', placesControllers.getPlacesByUserId);

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
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  foodControllers.updateFood
);

router.delete('/:fid', foodControllers.deleteFood);

module.exports = router;

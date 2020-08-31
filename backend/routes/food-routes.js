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
    check('name')
      .not()
      .isEmpty(),
    check('details')
      .not()
      .isEmpty(),
      check('expirydate')
      .not()
      .isEmpty(),  
    check('qty').isLength({ min: 1 }),
    check('comments')
      .not()
      .isEmpty(),
    check('foodgroupid')
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

const express = require('express');
const HttpError = require('../models/http-error');
const { check } = require('express-validator');
const checkAuth = require('../middleware/check-auth');


const router = express.Router();

const foodControllers = require('../controllers/food-controllers');

router.use(checkAuth);

router.get('/:fid', foodControllers.getFoodById);


router.get('/foodgroup/:fgid', foodControllers.getFoodsByFoodGroupId);



router.post(
  '/',
  [
    check('name')
      .not()
      .isEmpty(), 
    check('qty').isLength({ min: 1 }),
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
    check('details').isLength({ min: 1 })
  ],
  foodControllers.updateFood
);

router.delete('/:fid', foodControllers.deleteFood);

// router.use(checkAuth);

module.exports = router;

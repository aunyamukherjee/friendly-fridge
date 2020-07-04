const express = require('express');
const { check } = require('express-validator');

const foodgroupControllers = require('../controllers/foodgroup-controllers');

const router = express.Router();

router.get('/', foodgroupControllers.getFoodGroup);


module.exports = router;

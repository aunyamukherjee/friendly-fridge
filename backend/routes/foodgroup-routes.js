const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../middleware/check-auth');

const foodgroupControllers = require('../controllers/foodgroup-controllers');

const router = express.Router();

router.use(checkAuth);
router.get('/', foodgroupControllers.getAllFoodgroups);



router.post('/', foodgroupControllers.createFoodgroup);

router.delete('/:fgid', foodgroupControllers.deleteFoodgroup);


module.exports = router;

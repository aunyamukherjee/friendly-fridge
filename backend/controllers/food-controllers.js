const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Food = require('../models/food');
const Foodgroup = require('../models/foodgroup');



const getFoodById = async (req,res, next) => {
    const foodId = req.params.fid;
    let food;
    try {
    food =await Food.findById(foodId);
    } catch (err) {
        const error = new HttpError (
            'Something went wrong, could not find a food', 500
        );
        return next(error);
    }
    if (!food) {
        const error = new HttpError (
            'Could not find a food for the provided id.', 404
        );
        return next(error);

        throw new HttpError('Could not find a food for the provided id.', 404);
    }
    res.json({ food: food.toObject( { getters: true })});
};

const getFoodsByFoodGroupId = async (req, res, next)=> {
    const fgId = req.params.fgid;

    let foods;
    try {
    foods = await Food.find({ foodgroupid: fgId} );
    } catch (err) {
        const error = new HttpError (
            'Fetching food failed.  Please try again later', 500
        );
        return next(error);
    }
if (!foods || foods.length === 0) {
        return next(new HttpError('Could not find a food for the provided foodgroup id.', 404)
        );
    }

    res.json({foods: foods.map(food => food.toObject({ getters: true })) });  
}

//New createFood by foodgroupname
const createFood = async (req, res, next) => {
  const {name, details, expirydate, qty, foodgroupid } = req.body;
  console.log('req.body.name='+req.body.name);
  console.log('req.body.details='+req.body.details);
  console.log('req.body.expirydate='+req.body.expirydate);
  console.log('req.body.qty='+req.body.qty);
  console.log('req.body.foodgroupid='+req.body.foodgroupid);

  console.log("*******", name, details, expirydate, qty, foodgroupid);
  const createdFood =  new Food({
      name,
      details,
      expirydate,
      qty,
      foodgroupid
  });
  let foodgroup;
  try {
      //Search foodgroupid by foodgroupname from Mongo first
      foodgroup = await Foodgroup.findById(foodgroupid);
  } catch (err) {
      const error = new HttpError(
          'Creating food failed.  Please try again',
          500
      );
      return next(error);
  }
  if (!foodgroup) {
      const error = new HttpError(
          'Could not find foodgroup for the provided id',
          404
      );
      return next(error);
  }


try {
  const sess = await mongoose.startSession();
  sess.startTransaction();
  await createdFood.save({ session: sess });
  foodgroup.foods.push(createdFood);
  await foodgroup.save({ session: sess });
  await sess.commitTransaction();
} catch (err) {
  const error = new HttpError(
    'Creating food failed, please try again.',
    500
  );
  return next(error);
}
//check for place?
res.status(201).json({ place: createdFood });
};

const updateFood = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(
  //     new HttpError('Invalid inputs passed, please check your data.', 422)
  //   );
  // }

  const {name, details, qty } = req.body;
  const foodId = req.params.fid;
  console.log('req.body='+ JSON.stringify(req.body));
  console.log('req.params='+ JSON.stringify(req.params));
  console.log('req.payload='+ JSON.stringify(req.payload));

  console.log('req.body.name='+req.body.name);
  console.log('req.body.details='+req.body.details);
  console.log('req.body.qty='+req.body.qty);
  console.log('req.params.fid='+req.params.fid);


//  const {name, details, expirydate, qty, foodgroupid } = req.body;
  console.log("*******", name, details, qty, foodId);

  let food;
  try {
    food = await Food.findById(foodId);
  } catch (err) {
    const error = new HttpError (
        'Something went wrong, could not update food.', 500
    );
    return next(error);
  }
    food.name = name;
    food.details = details;
    food.qty = qty;
  try {
      await food.save();
    } catch (err) {
        const error = new HttpError (
            'Something went wrong, could not update food.', 500
        );
        return next(error);
      }
//    res.status(200).json({food: food.toObject({ getters: true })});
    res.status(200).json({food: food});
};

const deleteFood = async (req, res, next) => {
  const foodId = req.params.fid;
  let food;
  try {
    food = await Food.findById(foodId).populate('foodgroupid');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete food.',
      500
    );
    return next(error);
  }

  if (!food) {
    const error = new HttpError('Could not find food for this id.', 404);
    return next(error);
  }

try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await food.remove({ session: sess });
    food.foodgroupid.foods.pull(food);
    await food.foodgroupid.save({session: sess});
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong here, could not delete food.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted place.' });
};


exports.getFoodById = getFoodById;
exports.getFoodsByFoodGroupId = getFoodsByFoodGroupId;
exports.createFood = createFood;
exports.updateFood = updateFood;
exports.deleteFood = deleteFood;

  
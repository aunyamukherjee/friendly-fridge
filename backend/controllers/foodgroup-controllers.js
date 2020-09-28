
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');

const Foodgroup = require('../models/foodgroup');



const getAllFoodgroups = async (req, res, next) => {
    let foodgroup;
    try {
        foodgroup = await Foodgroup.find({});
    } catch (err) {
        const error = new HttpError (
            'Could not find any food groups', 500
        );
        return next(error);
    }
    if (foodgroup.length > 0) {
        res.type('application/json');
        //res.send(foodgroup);
        res.json(foodgroup);
        console.log("foodgroup returned=" + foodgroup);
    } else {
        const error = new HttpError (
            'Could not find any food groups.', 404
        );
        return next(error);
 
    }

}

const createFoodgroup = async (req, res, next) => {
    const {name } = req.body;
    const createdFoodgroup =  new Foodgroup({
        name,
        foods: []
    });

    try {
        await createdFoodgroup.save();
    } catch (err) {
        const error = new HttpError (
            'Creating food group failed, please check your data.', 
            500
            );
            return next(error);
    }
    res.status(201).json({foodgroup: createdFoodgroup.toObject({ getters: true})});
};

 const deleteFoodgroup = async (req, res, next) => {
    const foodgroupId = req.params.fgid;
    let foodgroup;
    try {
      foodgroup = await Foodgroup.findById(foodgroupId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete foodgroup.',
        500
      );
      return next(error);
    }
  
    if (!foodgroup) {
      const error = new HttpError('Could not find foodgroup for this id.', 404);
      return next(error);
    }
  
  try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await foodgroup.remove({ session: sess });
      await foodgroup.save({session: sess});
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong here, could not delete foodgroup.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({ message: 'Deleted Foodgroup.' });
   };
  
exports.getAllFoodgroups = getAllFoodgroups;
exports.createFoodgroup = createFoodgroup;
exports.deleteFoodgroup = deleteFoodgroup;
  
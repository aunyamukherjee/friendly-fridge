
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
    console.log('foodgroupid='+foodgroupId);
    let foodgroup;
    // try {
        console.log('foodgroupId='+foodgroupId);
        // foodgroup = await Foodgroup.findByIdAndDelete(foodgroupId);
        foodgroup = await Foodgroup.findById(foodgroupId);
        Foodgroup.findByIdAndDelete(foodgroupId, function (err, docs) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Result: "+docs);
            }
        });
    //   foodgroup = await Foodgroup.findById(foodgroupId);
    //   console.log('foodgroup object='+JSON.stringify(foodgroup));
    // } catch (err) {
    //   const error = new HttpError(
    //     'Something went wrong, could not delete foodgroup.',
    //     500
    //   );
    //   return next(error);
    // }
  console.log("foodgroup="+foodgroup);
    if (!foodgroup) {
      const error = new HttpError('Could not find foodgroup for this id.', 404);
      return next(error);
    }
  
  try {
    //   console.log('Creating Sess');
    //   const sess = await mongoose.startSession();
    //   console.log('Sess Created');
    //   sess.startTransaction();
    //   console.log('Trans started');
      await foodgroup.remove();
      console.log('Foodgroup removed');
    //   await foodgroup.save();
    //   console.log('foodgroup saved');
    //   await sess.commitTransaction();
    //   console.log('Committing Trans');
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
  